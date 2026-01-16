// Menampilan Kartu ATM

import { Edit2, Trash2, Copy, CreditCard } from "lucide-react";
import { showSuccessToast } from "@/Utils/Helpers/ToastHelpers";

export default function RekeningCard({ data, onEdit, onDelete }) {
  
  // Fungsi copy nomor rekening
  const handleCopy = () => {
    navigator.clipboard.writeText(data.nomor);
    showSuccessToast("Nomor rekening disalin!");
  };

  // Helper warna gradient berdasarkan bank (Opsional)
  const getGradient = (bankName) => {
    const name = bankName.toLowerCase();
    if (name.includes("bca")) return "from-blue-600 to-blue-800";
    if (name.includes("mandiri")) return "from-indigo-600 to-indigo-800";
    if (name.includes("bri")) return "from-blue-500 to-cyan-600";
    if (name.includes("bni")) return "from-teal-600 to-teal-800";
    return "from-slate-700 to-slate-900"; // Default
  };

  return (
    <div className="group relative w-full h-56 perspective-1000">
      
      {/* Kartu Fisik Look */}
      <div className={`
         relative w-full h-full rounded-2xl p-6 shadow-xl text-white 
         bg-gradient-to-br ${getGradient(data.bank)}
         transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1
      `}>
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
         <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-5 -mb-5"></div>
         
         {/* Chip Kartu */}
         <div className="relative z-10 flex justify-between items-start mb-8">
            <div className="w-12 h-9 bg-yellow-200/80 rounded-lg flex items-center justify-center overflow-hidden border border-yellow-300/50 shadow-sm">
                <div className="w-full h-[1px] bg-yellow-600/30 absolute top-1/3"></div>
                <div className="w-full h-[1px] bg-yellow-600/30 absolute bottom-1/3"></div>
                <div className="h-full w-[1px] bg-yellow-600/30 absolute left-1/3"></div>
                <div className="h-full w-[1px] bg-yellow-600/30 absolute right-1/3"></div>
            </div>
            <span className="font-bold text-lg tracking-wider opacity-90">{data.bank.toUpperCase()}</span>
         </div>

         {/* Nomor Rekening */}
         <div className="relative z-10 mb-6 group-copy cursor-pointer" onClick={handleCopy} title="Klik untuk salin">
             <div className="flex items-center gap-3">
                 <p className="text-2xl font-mono tracking-widest drop-shadow-md">
                   {data.nomor.replace(/(\d{4})(?=\d)/g, '$1 ')}
                 </p>
                 <Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300" />
             </div>
             <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-widest">Account Number</p>
         </div>

         {/* Nama Pemilik */}
         <div className="relative z-10 flex justify-between items-end">
             <div>
                <p className="font-bold text-sm tracking-widest uppercase truncate max-w-[200px]">{data.nama}</p>
                <p className="text-[10px] text-slate-300 uppercase tracking-widest">Card Holder</p>
             </div>
             <CreditCard size={28} className="opacity-50" />
         </div>

         {/* Action Buttons (Overlay saat Hover) */}
         <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
             <button 
               onClick={(e) => { e.stopPropagation(); onEdit(); }}
               className="p-3 bg-white/20 hover:bg-white text-white hover:text-blue-600 rounded-full backdrop-blur-md transition-all transform hover:scale-110"
               title="Edit"
             >
                <Edit2 size={20} />
             </button>
             <button 
               onClick={(e) => { e.stopPropagation(); onDelete(); }}
               className="p-3 bg-white/20 hover:bg-white text-white hover:text-red-600 rounded-full backdrop-blur-md transition-all transform hover:scale-110"
               title="Hapus"
             >
                <Trash2 size={20} />
             </button>
         </div>

      </div>
    </div>
  );
}