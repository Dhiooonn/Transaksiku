// Form Tambah/Edit

import { useState } from "react";
import { X, Save, CreditCard, User } from "lucide-react";

export default function RekeningModal({ data, onClose, onSave }) {
  const [form, setForm] = useState({
    nama: data.nama || "",
    nomor: data.nomor || "",
    bank: data.bank || "",
  });

  const InputField = ({ label, icon: Icon, ...props }) => (
    <div className="space-y-1.5">
       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
       <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
             <Icon size={18} />
          </div>
          <input 
             {...props}
             className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-slate-800"
          />
       </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
           <h3 className="text-lg font-bold text-slate-800">
             {data.id ? "Edit Rekening" : "Tambah Rekening Baru"}
           </h3>
           <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
              <X size={20} />
           </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-5">
           <InputField 
             label="Nama Pemilik" 
             placeholder="Nama sesuai buku tabungan"
             value={form.nama} 
             onChange={(e) => setForm({ ...form, nama: e.target.value })}
             icon={User}
           />
           
           <InputField 
             label="Nomor Rekening" 
             placeholder="Contoh: 1234567890"
             value={form.nomor} 
             onChange={(e) => setForm({ ...form, nomor: e.target.value })}
             icon={CreditCard}
             type="number"
           />

           <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bank</label>
              <div className="relative">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <CreditCard size={18} />
                 </div>
                 <select
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-slate-800 appearance-none cursor-pointer"
                    value={form.bank} 
                    onChange={(e) => setForm({ ...form, bank: e.target.value })}
                 >
                    <option value="">Pilih Bank</option>
                    <option value="BCA">BCA</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="BRI">BRI</option>
                    <option value="BNI">BNI</option>
                 </select>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="p-8 pt-0 flex gap-3">
           <button 
             onClick={onClose}
             className="w-1/2 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition"
           >
             Batal
           </button>
           <button 
             onClick={() => onSave(form)}
             className="w-1/2 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition flex justify-center items-center gap-2"
           >
             <Save size={18} /> Simpan
           </button>
        </div>

      </div>
    </div>
  );
}