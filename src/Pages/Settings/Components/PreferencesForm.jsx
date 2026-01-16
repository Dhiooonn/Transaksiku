// Tema & Notifikasi

import { useState, useEffect } from "react";
import { Moon, Sun, BellRing, BellOff } from "lucide-react";

export default function PreferencesForm() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="space-y-6">
       <div>
         <h2 className="text-xl font-bold text-slate-800">Preferensi Aplikasi</h2>
         <p className="text-slate-400 text-sm">Sesuaikan tampilan dan notifikasi sesuai kebutuhan Anda.</p>
       </div>

       <div className="grid gap-4">
          
          {/* Dark Mode Toggle Card */}
          <div className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl hover:border-blue-300 transition-colors cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
             <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-orange-100 text-orange-500'}`}>
                   {darkMode ? <Moon size={24} /> : <Sun size={24} />}
                </div>
                <div>
                   <h3 className="font-bold text-slate-800">Mode Tampilan</h3>
                   <p className="text-sm text-slate-500">{darkMode ? "Mode Gelap Aktif" : "Mode Terang Aktif"}</p>
                </div>
             </div>
             <div className="text-sm font-bold text-blue-600">
                {darkMode ? "Ubah ke Light" : "Ubah ke Dark"}
             </div>
          </div>

          {/* Notification Toggle Card */}
          <div className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl hover:border-blue-300 transition-colors cursor-pointer" onClick={() => setNotifications(!notifications)}>
             <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${notifications ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                   {notifications ? <BellRing size={24} /> : <BellOff size={24} />}
                </div>
                <div>
                   <h3 className="font-bold text-slate-800">Notifikasi Dashboard</h3>
                   <p className="text-sm text-slate-500">{notifications ? "Anda akan menerima notifikasi" : "Notifikasi dimatikan"}</p>
                </div>
             </div>
             <label className="relative inline-flex items-center cursor-pointer pointer-events-none">
                <input type="checkbox" className="sr-only peer" checked={notifications} readOnly />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

       </div>
    </div>
  );
}