import { ArrowUpRight, Activity } from "lucide-react";

export default function RecentActivity({ transactions }) {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Aktivitas Terbaru</h2>
      <div className="space-y-2">
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center hover:bg-slate-50 p-4 rounded-2xl transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                    tx.status === "Berhasil"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-orange-50 text-orange-500"
                  }`}
                >
                  {tx.status === "Berhasil" ? (
                    <ArrowUpRight size={20} />
                  ) : (
                    <Activity size={20} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{tx.tujuan}</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {tx.catatan || "Transfer Dana"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800 text-sm">
                  Rp {(tx.nominal || 0).toLocaleString("id-ID")}
                </p>
                <span
                  className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wide ${
                    tx.status === "Berhasil"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {tx.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-400 italic">
            Belum ada aktivitas transaksi
          </div>
        )}
      </div>
    </div>
  );
}