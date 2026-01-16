import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]; // Green, Amber, Red

export default function LaporanStatusPie({ data }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 h-full flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 mb-2">Status Transaksi</h3>
      <p className="text-slate-400 text-xs mb-6">Distribusi keberhasilan transaksi</p>
      
      <div className="flex-1 min-h-[250px] relative">
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie 
                data={data} 
                dataKey="value" 
                nameKey="name" 
                innerRadius={60} 
                outerRadius={80}
                paddingAngle={5}
                cornerRadius={6}
                stroke="none"
            >
                {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text (Optional) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <span className="text-slate-300 text-xs font-bold">DISTRIBUSI</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4">
         {data.map((entry, index) => (
             <div key={index} className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                 <span className="text-xs font-bold text-slate-600">{entry.name}</span>
             </div>
         ))}
      </div>
    </div>
  );
}