import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/Utils/Helpers/ToastHelpers";
import { dummyUser } from "@/Data/Dummy";
import Input from "@/Components/Input";
import Button from "@/Components/Button";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi login 
    if (form.email === dummyUser.email && form.password === dummyUser.password) {
      localStorage.setItem("user", JSON.stringify(dummyUser));
      showToast("success", `Selamat datang, ${dummyUser.name}!`);
      navigate("/admin/dashboard"); // Langsung ke dashboard setelah login
    } else {
      showToast("error", "Email atau password salah!");
    }
  };

  return (
    <section className="min-h-screen flex">
      {/* Left - Info Section */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0  from-blue-700/50 to-blue-800/70 opacity-90" />
        <div className="relative z-10 px-12">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Selamat Datang di <br /> <span className="text-white">TransaksiKu</span>
          </h2>
          <p className="text-gray-200 text-sm leading-relaxed mb-8 max-w-sm">
            Kelola transaksi digitalmu dengan cepat, mudah, dan aman.  
            Desain elegan untuk pengalaman keuangan terbaik 💸
          </p>

          {/* Info Cards */}
          <div className="grid gap-4">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xl border border-white/20 shadow-lg">
              <p className="text-gray-200 text-sm mb-1">Total Transaksi</p>
              <p className="text-2xl font-semibold">$120.29</p>
              <div className="w-full h-2 bg-gray-700 rounded-full mt-2">
                <div className="w-3/4 h-2 bg-blue-400 rounded-full"></div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xl border border-white/20 shadow-lg">
              <p className="font-semibold text-gray-200">Transaksi Terbaru</p>
              <p className="text-sm text-gray-300">Siti Aminah - Rp 250.000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form Login */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white p-10 lg:p-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat Datang 👋
          </h1>
          <p className="text-gray-500 mb-8">
            Masuk ke akunmu untuk melanjutkan transaksi
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Email */}
            <Input
              label="Email"
              placeholder="Masukkan email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all"
            />

            {/* Input Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="rounded-xl border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all"
            />

            {/* Tombol Login */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.02] transition-all duration-200"
            >
              Masuk
            </Button>
          </form>

          {/* Link Daftar */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Belum punya akun?{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Daftar
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
