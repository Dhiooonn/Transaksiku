import { Calendar, Search, Filter, Download } from "lucide-react";

export default function LaporanFilter({ filters, setFilters }) {
  const update = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  // Helper Input Component
  const FilterInput = ({ icon: Icon, ...props }) => (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <Icon size={16} />
      </div>
      <input
        {...props}
        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
        
        {/* Date Range Group */}
        <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1 px-3">
             <Calendar size={16} className="text-slate-500" />
             <input 
               type="date" 
               className="bg-transparent text-sm font-medium text-slate-600 outline-none w-full sm:w-auto"
               onChange={(e) => update("from", e.target.value)} 
             />
             <span className="text-slate-300">-</span>
             <input 
               type="date" 
               className="bg-transparent text-sm font-medium text-slate-600 outline-none w-full sm:w-auto"
               onChange={(e) => update("to", e.target.value)} 
             />
          </div>
        </div>

        {/* Filters Group */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full xl:w-auto flex-1">
            <FilterInput 
              icon={Search} 
              placeholder="Min Nominal" 
              type="number"
              onChange={(e) => update("min", e.target.value)} 
            />
            <FilterInput 
              icon={Search} 
              placeholder="Max Nominal" 
              type="number"
              onChange={(e) => update("max", e.target.value)} 
            />
            
            <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Filter size={16} />
                </div>
                <select 
                    className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-slate-600 appearance-none cursor-pointer"
                    onChange={(e) => update("status", e.target.value)}
                >
                    <option value="">Semua Status</option>
                    <option value="Berhasil">Berhasil</option>
                    <option value="Pending">Pending</option>
                    <option value="Gagal">Gagal</option>
                </select>
            </div>

            <FilterInput 
              icon={Search} 
              placeholder="Cari Penerima..." 
              onChange={(e) => update("tujuan", e.target.value)} 
            />
        </div>

        {/* Export Button */}
        <button className="w-full xl:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all">
            <Download size={16} /> Export
        </button>

      </div>
    </div>
  );
}