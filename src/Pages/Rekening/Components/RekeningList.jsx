// Menampilan Frid Card

import RekeningCard from "./RekeningCard";
import { SearchX } from "lucide-react";

export default function RekeningList({ data, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <SearchX size={64} className="mb-4 text-slate-200" />
        <p className="text-lg font-medium">Tidak ada rekening ditemukan</p>
        <p className="text-sm">Coba ubah filter pencarian Anda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-4">
      {data.map((rekening) => (
        <RekeningCard
          key={rekening.id}
          data={rekening}
          onEdit={() => onEdit(rekening)}
          onDelete={() => onDelete(rekening.id)}
        />
      ))}
    </div>
  );
}