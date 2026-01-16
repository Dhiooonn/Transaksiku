// Search & Filter

import { Search, Plus } from "lucide-react";

export default function RekeningToolbar({ search, setSearch, bank, setBank, sort, setSort, onAdd }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      
      {/* Search Bar */}
      <div className="relative w-full md:w-96">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
         <input
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium"
            placeholder="Cari nama pemilik atau bank..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center gap-3 w-full md:w-auto">
         
         <select 
            value={bank} 
            onChange={(e) => setBank(e.target.value)} 
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none focus:border-blue-500 cursor-pointer"
         >
            <option value="">Semua Bank</option>
            <option value="BCA">BCA</option>
            <option value="Mandiri">Mandiri</option>
            <option value="BRI">BRI</option>
            <option value="BNI">BNI</option>
         </select>

         <button 
            onClick={onAdd} 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200 flex items-center gap-2 transition-all active:scale-95 ml-auto md:ml-0"
         >
            <Plus size={18} /> Tambah
         </button>
      </div>
    </div>
  );
}