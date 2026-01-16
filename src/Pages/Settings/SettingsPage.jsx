import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Settings, User, Shield, Sliders } from "lucide-react";

// Components
import ProfileCard from "./Components/ProfileCard";
import ProfileForm from "./Components/ProfileForm";
import SecurityForm from "./Components/SecurityForm";
import PreferencesForm from "./Components/PreferencesForm";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { id: "profile", label: "Edit Profil", icon: User },
    { id: "security", label: "Keamanan", icon: Shield },
    { id: "preferences", label: "Preferensi", icon: Sliders },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile": return <ProfileForm />;
      case "security": return <SecurityForm />;
      case "preferences": return <PreferencesForm />;
      default: return <ProfileForm />;
    }
  };

  return (
    <AdminLayout>
      <div className="font-sans text-slate-800 space-y-8 p-2">
        
        {/* Header */}
        <div className="flex flex-col gap-1">
           <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-xl text-white">
                <Settings size={24} />
             </div>
             Pengaturan
           </h1>
           <p className="text-slate-500 font-medium ml-[3.25rem]">
             Kelola akun dan preferensi aplikasi Anda.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kolom Kiri: Kartu Profil & Menu */}
          <div className="space-y-6">
            <ProfileCard />
            
            {/* Menu Navigasi */}
            <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-600 shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Kolom Kanan: Isi Konten */}
          <div className="lg:col-span-2">
             <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 min-h-[500px]">
                {renderContent()}
             </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}