import { useState } from "react";
import { User, Mail, Save, Image, UploadCloud } from "lucide-react";
import { showSuccessToast } from "@/Utils/Helpers/ToastHelpers";

export default function ProfileForm() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
  });

  const handleSave = () => {
    const updated = { ...user, ...form };
    localStorage.setItem("user", JSON.stringify(updated));
    showSuccessToast("Profil berhasil diperbarui");
    window.location.reload(); 
  };

  // Komponen Input Custom
  const InputField = ({ label, icon: Icon, ...props }) => (
    <div className="space-y-1.5">
       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
       <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
             <Icon size={18} />
          </div>
          <input 
             {...props}
             className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-slate-800 placeholder:text-slate-400"
          />
       </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-xl font-bold text-slate-800">Informasi Pribadi</h2>
        <p className="text-slate-400 text-sm mt-1">Perbarui foto dan detail data diri Anda.</p>
      </div>
      
      <div className="space-y-6">
         
         {/* Custom File Upload - Menggantikan input file bawaan */}
         <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Foto Profil</label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 hover:bg-blue-50/50 hover:border-blue-300 transition-all group cursor-pointer text-center">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-white shadow-sm rounded-full text-blue-500 group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                            Klik untuk upload foto baru
                        </p>
                        <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                    </div>
                </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
                label="Nama Lengkap" 
                icon={User} 
                value={form.name} 
                placeholder="Masukkan nama anda"
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            
            <InputField 
                label="Alamat Email" 
                icon={Mail} 
                value={form.email} 
                placeholder="nama@email.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
            />
         </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end">
        <button 
          onClick={handleSave}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95 flex items-center gap-2"
        >
           <Save size={18} /> Simpan Perubahan
        </button>
      </div>
    </div>
  );
}