import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-slate-700">
        <p className="font-semibold mb-1">{label}</p>
        <p>{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function TransactionChart({ data, isLoading }) {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-slate-800">Customer Habits</h3>
        <select className="bg-slate-50 border-none text-xs font-semibold text-slate-500 py-2 px-4 rounded-xl cursor-pointer hover:bg-slate-100 transition outline-none">
          <option>Yearly</option>
          <option>Monthly</option>
        </select>
      </div>

      {!isLoading && data ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="tanggal"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <Tooltip cursor={{ fill: "#f8fafc", radius: 4 }} content={<CustomTooltip />} />
            <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 6, 6]} name="Transaksi" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] w-full bg-slate-50 rounded-xl animate-pulse"></div>
      )}
    </div>
  );
}