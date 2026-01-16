// Password & 2FA

import { useState } from "react";
import { Lock, KeyRound, ShieldCheck } from "lucide-react";
import { showSuccessToast, showErrorToast } from "@/Utils/Helpers/ToastHelpers";

export default function SecurityForm() {
  const [pass, setPass] = useState({ current: "", new: "", confirm: "" });
  const [twoFA, setTwoFA] = useState(false);

  const handlePasswordChange = () => {
    if (pass.new.length < 6) {
      showErrorToast("Password minimal 6 karakter");
      return;
    }
    if (pass.new !== pass.confirm) {
        showErrorToast("Konfirmasi password tidak cocok");
        return;
    }
    showSuccessToast("Password berhasil diperbarui");
    setPass({ current: "", new: "", confirm: "" });
  };

  const InputField = ({ label, ...props }) => (
    <div className="space-y-1.5">
       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
       <div className="relative">
          <input 
             type="password"
             {...props}
             className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-slate-800"
          />
       </div>
    </div>
  );

  return (
    <div className="space-y-8">
      
      {/* Ubah Password Section */}
      <div className="space-y-6">
        <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <KeyRound size={20} className="text-blue-500" /> Ubah Password
            </h2>
            <p className="text-slate-400 text-sm">Pastikan menggunakan password yang kuat dan unik.</p>
        </div>
        
        <div className="grid gap-4">
            <InputField 
                label="Password Sekarang" 
                value={pass.current} 
                onChange={(e) => setPass({...pass, current: e.target.value})} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField 
                    label="Password Baru" 
                    value={pass.new} 
                    onChange={(e) => setPass({...pass, new: e.target.value})} 
                />
                <InputField 
                    label="Konfirmasi Password" 
                    value={pass.confirm} 
                    onChange={(e) => setPass({...pass, confirm: e.target.value})} 
                />
            </div>
        </div>

        <div className="flex justify-end">
            <button 
                onClick={handlePasswordChange}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all text-sm"
            >
                Update Password
            </button>
        </div>
      </div>

      <div className="border-t border-slate-100 my-6"></div>

      {/* 2FA Section */}
      <div className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
         <div className="flex gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl h-fit">
                <ShieldCheck size={24} />
            </div>
            <div>
                <h3 className="font-bold text-slate-800">Two-Factor Authentication</h3>
                <p className="text-sm text-slate-500 max-w-sm mt-1">
                    Tambahkan lapisan keamanan ekstra. Kode akan dikirim ke email saat login.
                </p>
            </div>
         </div>
         
         <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
         </label>
      </div>

    </div>
  );
}