import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 text-white text-xs rounded-lg py-2 px-3 shadow-xl">
          <p className="font-semibold mb-1">{label}</p>
          <p>Total: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

export default function LaporanTopRecipient({ data }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800">Top Penerima Dana</h3>
        <p className="text-slate-400 text-xs">Frekuensi transfer terbanyak ke rekening tujuan</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
             dataKey="name" 
             axisLine={false} 
             tickLine={false} 
             tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} 
             dy={10}
          />
          <YAxis 
             axisLine={false} 
             tickLine={false} 
             tick={{fill: '#94a3b8', fontSize: 12}} 
          />
          <Tooltip cursor={{fill: '#f8fafc', radius: 8}} content={<CustomTooltip />} />
          <Bar 
             dataKey="total" 
             fill="#3b82f6" 
             radius={[8, 8, 8, 8]} // Fully rounded bars
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}