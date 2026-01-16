import { useState } from "react";
import { Send, User, CreditCard, Banknote, FileText } from "lucide-react";
import Swal from "sweetalert2";
import FavoriteDropdown from "./FavoriteDropdown";
import SchedulePicker from "./SchedulePicker";
import TransferReceipt from "./TransferReceipt";

export default function TransferForm({ onTransfer }) {
  const [form, setForm] = useState({
    tujuan: "",
    bank: "",
    nomor: "",
    nominal: "",
    catatan: "",
  });
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Custom Input Style Wrapper
  const InputGroup = ({ icon: Icon, label, ...props }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </div>
        <input
          {...props}
          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
        />
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.tujuan || !form.bank || !form.nomor || form.nominal < 1000) {
      Swal.fire({
          icon: 'error',
          title: 'Data Tidak Valid',
          text: 'Pastikan semua field terisi dan nominal minimal Rp 1.000',
          confirmButtonColor: '#3b82f6'
      });
      return;
    }

    // Konfirmasi SweetAlert
    const result = await Swal.fire({
      title: "Konfirmasi Transfer",
      html: `
        <div class="text-left text-sm bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
          <p><strong>Tujuan:</strong> ${form.tujuan}</p>
          <p><strong>Bank:</strong> ${form.bank}</p>
          <p><strong>Nominal:</strong> Rp ${Number(form.nominal).toLocaleString("id-ID")}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Kirim",
      cancelButtonText: "Batal",
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      customClass: {
        popup: 'rounded-3xl'
      }
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    setTimeout(() => {
      onTransfer({ ...form, schedule });
      setReceipt(form);
      setForm({ tujuan: "", bank: "", nomor: "", nominal: "", catatan: "" });
      setSchedule("");
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 h-full">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Formulir Transfer</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Dropdown Favorite */}
          <FavoriteDropdown 
            onSelect={(r) => setForm({
              ...form,
              tujuan: r.nama,
              bank: r.bank,
              nomor: r.nomor
            })} 
          />

          <InputGroup 
            icon={User} 
            label="Nama Penerima" 
            name="tujuan" 
            value={form.tujuan} 
            onChange={handleChange} 
            placeholder="Contoh: Budi Santoso" 
          />

          <div className="grid grid-cols-2 gap-4">
             <InputGroup 
                icon={CreditCard} 
                label="Bank" 
                name="bank" 
                value={form.bank} 
                onChange={handleChange} 
                placeholder="BCA" 
             />
             <InputGroup 
                icon={CreditCard} 
                label="Nomor Rekening" 
                name="nomor" 
                value={form.nomor} 
                onChange={handleChange} 
                placeholder="123xxxxx" 
             />
          </div>

          <InputGroup 
            icon={Banknote} 
            label="Nominal (Rp)" 
            name="nominal" 
            type="number" 
            value={form.nominal} 
            onChange={handleChange} 
            placeholder="0" 
          />

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Catatan</label>
            <div className="relative">
              <div className="absolute left-4 top-4 text-slate-400">
                <FileText size={18} />
              </div>
              <textarea
                name="catatan"
                value={form.catatan}
                onChange={handleChange}
                rows="2"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium resize-none"
                placeholder="Berita acara (opsional)"
              />
            </div>
          </div>

          <SchedulePicker onChange={setSchedule} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-blue-200 shadow-lg transition-all active:scale-[0.98] flex justify-center items-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
                <>
                  <Send size={20} /> Kirim Sekarang
                </>
            )}
          </button>
        </form>
      </div>

      {/* Modal Receipt */}
      {receipt && <TransferReceipt data={receipt} onClose={() => setReceipt(null)} />}
    </>
  );
}