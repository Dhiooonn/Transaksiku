import { CalendarClock } from "lucide-react";

export default function SchedulePicker({ onChange }) {
  return (
    <div className="space-y-1.5 pt-2">
       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jadwalkan Transfer (Opsional)</label>
       <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
             <CalendarClock size={18} />
          </div>
          <input
            type="datetime-local"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
            onChange={(e) => onChange(e.target.value)}
          />
       </div>
    </div>
  );
}