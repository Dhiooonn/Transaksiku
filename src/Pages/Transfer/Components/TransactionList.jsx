import { useState } from "react";
import Swal from "sweetalert2";
import { toastSuccess } from "@/Utils/Helpers/ToastHelpers";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import Input from "@/Components/Input";

export default function TransactionList({ transactions, setTransactions }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [formData, setFormData] = useState({
    tujuan: "",
    nominal: "",
    catatan: "",
  });

  // 🗑 Hapus transaksi
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Transaksi?",
      text: "Data transaksi akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = transactions.filter((tx) => tx.id !== id);
        setTransactions(updated);
        Swal.fire("Dihapus!", "Transaksi berhasil dihapus.", "success");
      }
    });
  };

  // ✏️ Edit transaksi
  const handleEdit = (tx) => {
    setSelectedTx(tx);
    setFormData({
      tujuan: tx.tujuan,
      nominal: tx.nominal,
      catatan: tx.catatan,
    });
    setShowModal(true);
  };

  // 💾 Simpan perubahan
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.tujuan || formData.nominal < 1000) return;

    const updated = transactions.map((tx) =>
      tx.id === selectedTx.id ? { ...tx, ...formData } : tx
    );

    setTransactions(updated);
    toastSuccess("Transaksi berhasil diperbarui!");
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Riwayat Transaksi ({transactions.length})
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nama Tujuan</th>
              <th className="px-6 py-3">Nominal</th>
              <th className="px-6 py-3">Catatan</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <tr
                  key={tx.id}
                  className={`border-t border-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50/40 transition duration-150`}
                >
                  <td className="px-6 py-3 font-semibold text-gray-800">
                    {tx.id}
                  </td>
                  <td className="px-6 py-3">{tx.tujuan}</td>
                  <td className="px-6 py-3 text-blue-600 font-medium">
                    Rp {tx.nominal.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {tx.catatan || "-"}
                  </td>
                  <td className="px-6 py-3 text-gray-500">{tx.tanggal}</td>

                  {/* Status Badge */}
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        tx.status === "Berhasil"
                          ? "bg-green-100 text-green-700"
                          : tx.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="px-6 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="edit"
                        onClick={() => handleEdit(tx)}
                        className="text-xs px-3 py-1.5"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(tx.id)}
                        className="text-xs px-3 py-1.5"
                      >
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-400 italic bg-gray-50"
                >
                  Belum ada transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Edit */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Edit Transaksi"
        width="450px"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-3">
            <Input
              label="Nama Tujuan"
              placeholder="Masukkan nama penerima"
              value={formData.tujuan}
              onChange={(e) =>
                setFormData({ ...formData, tujuan: e.target.value })
              }
            />

            <Input
              label="Nominal"
              type="number"
              placeholder="Masukkan nominal"
              value={formData.nominal}
              onChange={(e) =>
                setFormData({ ...formData, nominal: e.target.value })
              }
            />

            <Input
              label="Catatan"
              as="textarea"
              placeholder="Tambahkan pesan jika perlu"
              value={formData.catatan}
              onChange={(e) =>
                setFormData({ ...formData, catatan: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-1/2"
              onClick={() => setShowModal(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" className="w-1/2">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}