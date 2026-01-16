import { useState } from "react";
import Swal from "sweetalert2";
import { Edit2, Trash2, Search, ArrowUpRight } from "lucide-react";

export default function TransactionList({ transactions, setTransactions }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Transaksi?",
      text: "Data tidak dapat dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#cbd5e1",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      customClass: { popup: 'rounded-3xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = transactions.filter((tx) => tx.id !== id);
        setTransactions(updated);
        Swal.fire({
            title: "Terhapus!", 
            icon: "success", 
            confirmButtonColor: "#3b82f6",
            customClass: { popup: 'rounded-3xl' }
        });
      }
    });
  };

  const filtered = transactions.filter(tx => 
      tx.tujuan.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Bar Kecil */}
      <div className="relative">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
         <input 
            type="text" 
            placeholder="Cari transaksi..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border-none text-sm focus:ring-2 focus:ring-blue-100 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
         />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
              <th className="pb-3 font-semibold pl-4">Penerima</th>
              <th className="pb-3 font-semibold">Tanggal</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Nominal</th>
              <th className="pb-3 font-semibold text-center pr-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filtered.length > 0 ? (
              filtered.map((tx) => (
                <tr key={tx.id} className="group hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                            {tx.tujuan.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-700">{tx.tujuan}</p>
                            <p className="text-xs text-slate-400">{tx.bank} • {tx.id}</p>
                        </div>
                    </div>
                  </td>
                  <td className="py-4 text-slate-500 font-medium">
                     {tx.tanggal}
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        tx.status === 'Berhasil' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 text-right font-bold text-slate-700">
                    Rp {Number(tx.nominal).toLocaleString("id-ID")}
                  </td>
                  <td className="py-4 pr-4 text-center">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       {/* Tombol Delete saja untuk contoh clean UI */}
                       <button 
                          onClick={() => handleDelete(tx.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Hapus"
                       >
                          <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400 italic">
                        Tidak ada data transaksi
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}