import { Wallet, TrendingUp } from "lucide-react";

export default function BalanceCard({ user }) {
  return (
    <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-blue-200 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[240px]">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl -ml-5 -mb-5"></div>

      <div className="relative z-10 flex justify-between items-start">
        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="bg-green-400/20 text-green-100 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <TrendingUp size={14} /> +2.08%
        </span>
      </div>

      <div className="relative z-10 mt-6">
        <p className="text-blue-100 text-sm font-medium mb-1">Total Saldo Aktif</p>
        <h2 className="text-4xl font-bold tracking-tight">
          Rp {(user?.saldo || 0).toLocaleString("id-ID")}
        </h2>
        <p className="text-blue-200 text-xs mt-4 opacity-80">
          Dibandingkan bulan lalu
        </p>
      </div>
    </div>
  );
}