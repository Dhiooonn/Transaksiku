import { Banknote, Calculator, Hash } from "lucide-react";

export default function LaporanSummary({ summary }) {
  const Card = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-start gap-4">
       <div className={`p-3 rounded-2xl ${color}`}>
          <Icon size={24} />
       </div>
       <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
       </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card 
        title="Total Transaksi" 
        value={summary.total} 
        icon={Hash} 
        color="bg-blue-50 text-blue-600" 
      />
      <Card 
        title="Total Nominal" 
        value={`Rp ${summary.totalNominal.toLocaleString("id-ID")}`} 
        icon={Banknote} 
        color="bg-emerald-50 text-emerald-600" 
      />
      <Card 
        title="Rata-rata Transaksi" 
        value={`Rp ${summary.avg.toLocaleString("id-ID")}`} 
        icon={Calculator} 
        color="bg-purple-50 text-purple-600" 
      />
    </div>
  );
}