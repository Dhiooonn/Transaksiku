import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-slate-700">
        <p className="font-semibold mb-1">{label}</p>
        <p>{`Total: Rp ${payload[0].value.toLocaleString('id-ID')}`}</p>
      </div>
    );
  }
  return null;
};

export default function LaporanChart({ data }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 h-full">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Trend Transaksi</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
             dataKey="tanggal" 
             axisLine={false} 
             tickLine={false} 
             tick={{fill: '#94a3b8', fontSize: 12}} 
             dy={10}
          />
          <YAxis 
             axisLine={false} 
             tickLine={false} 
             tick={{fill: '#94a3b8', fontSize: 12}} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
             type="monotone" 
             dataKey="total" 
             stroke="#3b82f6" 
             strokeWidth={3}
             fillOpacity={1} 
             fill="url(#colorTotal)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}