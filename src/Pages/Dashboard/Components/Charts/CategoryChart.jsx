import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

export default function CategoryChart({ data, isLoading }) {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800">Product Statistics</h3>
        <p className="text-slate-400 text-xs">Kategori Transaksi</p>
      </div>

      {!isLoading && data ? (
        <div className="relative">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={65}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
                cornerRadius={8}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="space-y-4 mt-4">
            {data.map((entry, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-slate-600 font-medium">{entry.name}</span>
                </div>
                <span className="font-bold text-slate-800">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[250px] w-full bg-slate-50 rounded-xl animate-pulse"></div>
      )}
    </div>
  );
}