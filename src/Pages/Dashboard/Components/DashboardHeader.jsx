export default function DashboardHeader({ user }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div className="text-sm">
          <span className="block font-bold text-slate-700">
            {user?.name?.split(" ")[0]}
          </span>
          <span className="text-xs text-slate-400">Admin Store</span>
        </div>
      </div>
    </div>
  );
}