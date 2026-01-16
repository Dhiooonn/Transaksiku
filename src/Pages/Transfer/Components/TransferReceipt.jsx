import { CheckCircle2, X } from "lucide-react";

export default function TransferReceipt({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[99]">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Header Biru */}
        <div className="bg-blue-600 p-8 text-center text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-blue-200 hover:text-white">
             <X size={24} />
          </button>
          <div className="flex justify-center mb-4">
             <CheckCircle2 size={64} className="text-blue-200" />
          </div>
          <h3 className="text-2xl font-bold">Transfer Berhasil!</h3>
          <p className="text-blue-100 text-sm mt-1">{new Date().toLocaleString()}</p>
        </div>

        {/* Body Receipt */}
        <div className="p-8 space-y-6">
           <div className="text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Nominal</p>
              <h2 className="text-3xl font-bold text-slate-800 mt-1">
                 Rp {Number(data.nominal).toLocaleString("id-ID")}
              </h2>
           </div>

           <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-100 text-sm">
              <div className="flex justify-between">
                 <span className="text-slate-500">Penerima</span>
                 <span className="font-bold text-slate-800">{data.tujuan}</span>
              </div>
              <div className="flex justify-between">
                 <span className="text-slate-500">Bank</span>
                 <span className="font-bold text-slate-800">{data.bank}</span>
              </div>
              <div className="flex justify-between">
                 <span className="text-slate-500">Rekening</span>
                 <span className="font-bold text-slate-800">{data.nomor}</span>
              </div>
              {data.catatan && (
                <div className="flex justify-between border-t border-slate-200 pt-3 mt-2">
                    <span className="text-slate-500">Catatan</span>
                    <span className="font-medium text-slate-800 text-right max-w-[150px] truncate">{data.catatan}</span>
                </div>
              )}
           </div>

           <button 
             onClick={onClose}
             className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition"
           >
             Tutup
           </button>
        </div>

      </div>
    </div>
  );
}