import { useState, useEffect } from "react";
import {
  useRekening,
  useCreateRekening,
  useUpdateRekening,
  useDeleteRekening,
  useBulkDeleteRekening,
} from "@/Utils/hooks/useRekening";
import { confirmUpdate, confirmDelete } from "@/Utils/Helpers/SwalHelpers";
import { showSuccessToast, showErrorToast } from "@/Utils/Helpers/ToastHelpers";
import { WalletCards } from "lucide-react";

// Components
import RekeningToolbar from "./Components/RekeningToolbar";
import RekeningList from "./Components/RekeningList";
import RekeningPagination from "./Components/RekeningPagination";
import RekeningModal from "./Components/RekeningModal";

export default function RekeningPage() {
  // State
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [bank, setBank] = useState("");
  const [sort, setSort] = useState("nama");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  // Debounce Search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 500);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Fetch Data
  const { data, isLoading } = useRekening({ page, search, bank, sort });
  const rekening = data?.data || [];
  const total = data?.total || 0;

  // Mutations
  const create = useCreateRekening();
  const update = useUpdateRekening();
  const del = useDeleteRekening();

  // Handlers
  const handleSave = async (form) => {
    if (!form.nama || !form.bank || !form.nomor) {
      showErrorToast("Semua field wajib diisi");
      return;
    }
    if (!/^\d{8,16}$/.test(form.nomor)) {
      showErrorToast("Nomor rekening harus 8–16 digit angka");
      return;
    }

    if (modal?.id) {
      const res = await confirmUpdate("Simpan perubahan rekening ini?");
      if (!res.isConfirmed) return;
      update.mutate({ id: modal.id, data: form }, {
        onSuccess: () => showSuccessToast("Rekening berhasil diperbarui"),
        onError: (e) => showErrorToast(e.message),
      });
    } else {
      create.mutate(form, {
        onSuccess: () => showSuccessToast("Rekening berhasil ditambahkan"),
        onError: (e) => showErrorToast(e.message),
      });
    }
    setModal(null);
  };

  const handleDelete = async (id) => {
    const res = await confirmDelete("Hapus rekening ini?");
    if (res.isConfirmed) {
      del.mutate(id, {
        onSuccess: () => showSuccessToast("Rekening berhasil dihapus"),
        onError: () => showErrorToast("Gagal menghapus rekening"),
      });
    }
  };

  return (
    <div className="font-sans text-slate-800 space-y-8 p-2">
       {/* Header */}
       <div className="flex flex-col gap-1">
           <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-xl text-white">
                <WalletCards size={24} />
             </div>
             Daftar Rekening
           </h1>
           <p className="text-slate-500 font-medium ml-[3.25rem]">
             Kelola rekening bank tujuan transfer Anda dengan mudah.
           </p>
        </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 min-h-[600px]">
        
        <RekeningToolbar
          search={searchInput}
          setSearch={setSearchInput}
          bank={bank}
          setBank={setBank}
          sort={sort}
          setSort={setSort}
          onAdd={() => setModal({})}
        />

        <RekeningList
          data={rekening}
          isLoading={isLoading}
          onEdit={setModal}
          onDelete={handleDelete}
        />

        <RekeningPagination 
           page={page} 
           total={total} 
           onChange={setPage} 
        />
      </div>

      {modal && (
        <RekeningModal
          data={modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}