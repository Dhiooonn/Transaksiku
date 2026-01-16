import { useRekening } from "@/Utils/hooks/useRekening";
import { Star } from "lucide-react";

export default function FavoriteDropdown({ onSelect }) {
  const { data } = useRekening({});
  const rekening = data?.data || [];

  return (
    <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rekening Favorit</label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Star size={18} />
            </div>
            <select
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer font-medium"
            onChange={(e) => {
                const r = rekening.find((x) => x.id == e.target.value);
                if (r) onSelect(r);
            }}
            >
            <option value="">Pilih dari daftar...</option>
            {rekening.map((r) => (
                <option key={r.id} value={r.id}>
                {r.nama} – {r.bank} ({r.nomor})
                </option>
            ))}
            </select>
            {/* Custom Arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
        </div>
    </div>
  );
}