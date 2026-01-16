import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RekeningPagination({ page, total, onChange }) {
  const totalPages = Math.ceil(total / 6); // Asumsi limit per page 6 (agar grid rapi)

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center mt-8 border-t border-slate-100 pt-6">
      <p className="text-sm text-slate-500 font-medium">
        Halaman <span className="font-bold text-slate-800">{page}</span> dari {totalPages}
      </p>
      
      <div className="flex gap-2">
        <button 
           disabled={page === 1} 
           onClick={() => onChange(page - 1)}
           className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
           <ChevronLeft size={20} />
        </button>
        <button 
           disabled={page === totalPages} 
           onClick={() => onChange(page + 1)}
           className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
           <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}