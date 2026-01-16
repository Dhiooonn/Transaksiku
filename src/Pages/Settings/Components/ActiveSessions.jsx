// Riwayat Login Device

import { Laptop, Smartphone, Globe } from "lucide-react";

export default function ActiveSessions() {
  const sessions = [
    { id: 1, device: "Chrome on Windows", location: "Jakarta, Indonesia", ip: "192.168.1.10", active: true, type: "desktop" },
    { id: 2, device: "iPhone 13 Pro", location: "Bandung, Indonesia", ip: "10.0.0.5", active: false, type: "mobile" },
    { id: 3, device: "Safari on Mac", location: "Surabaya, Indonesia", ip: "172.16.0.2", active: false, type: "desktop" },
  ];

  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-xl font-bold text-slate-800">Sesi Aktif</h2>
            <p className="text-slate-400 text-sm">Kelola perangkat yang terhubung ke akun Anda.</p>
        </div>

        <div className="space-y-4">
            {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600">
                            {session.type === 'desktop' ? <Laptop size={24} /> : <Smartphone size={24} />}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                {session.device}
                                {session.active && <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] rounded-full uppercase tracking-wider">Saat Ini</span>}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                <Globe size={12} /> {session.location} • {session.ip}
                            </div>
                        </div>
                    </div>
                    
                    {!session.active && (
                        <button className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition">
                            Log Out
                        </button>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
}