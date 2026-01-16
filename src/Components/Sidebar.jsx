import { useNavigate, useLocation } from "react-router-dom";
import { confirmLogout } from "@/Utils/Helpers/SwalHelpers";
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  WalletCards, 
  FileBarChart, 
  Settings, 
  LogOut, 
  Command 
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "User", email: "user@example.com" };

  const handleLogout = async () => {
    const result = await confirmLogout();
    if (result.isConfirmed) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Transfer", path: "/admin/transfer", icon: ArrowRightLeft },
    { name: "Rekening", path: "/admin/rekening", icon: WalletCards },
    { name: "Laporan", path: "/admin/laporan", icon: FileBarChart },
    { name: "Setting", path: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-100 flex flex-col justify-between z-50 transition-all duration-300">
      
      {/* 1. Logo Section */}
      <div className="p-8 pb-4">
        <div 
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-blue-200 shadow-lg group-hover:scale-110 transition-transform">
            <Command size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
              Transaksiku
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* 2. Menu Navigation */}
      <nav className="flex-1 px-6 space-y-2 mt-6 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 relative overflow-hidden
                ${isActive 
                  ? "bg-blue-600 text-white shadow-blue-200 shadow-lg translate-x-1" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-blue-600 hover:translate-x-1"
                }
              `}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm">{item.name}</span>
              
              {/* Indikator aktif kecil di kanan (opsional) */}
              {isActive && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full opacity-50"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Bottom Section: User & Logout */}
      <div className="p-6">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 overflow-hidden shadow-sm">
                 {/* Cek jika ada foto, jika tidak pakai inisial */}
                 {user.photo ? <img src={user.photo} alt="user" className="w-full h-full object-cover" /> : <span className="font-bold">{user.name?.charAt(0)}</span>}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-2xl font-bold text-sm transition-all duration-200 group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Keluar Aplikasi
        </button>
      </div>

    </aside>
  );
}