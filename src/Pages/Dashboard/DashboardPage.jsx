import { useEffect, useState } from "react";
import DashboardCard from "./Components/DashboardCard";
import { dummyUser, transaksiList } from "@/Data/Dummy";
import AdminLayout from "@/Layouts/AdminLayout";
import { useDashboard } from "@/Utils/hooks/useDashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const [user, setUser] = useState(dummyUser);
  const [transactions, setTransactions] = useState([]);

  // React Query (API Dashboard)
  const { data: stats, isLoading, isError } = useDashboard();

  // storage key per user
  const storageKey = `transactions_${user.name.replace(/\s+/g, "_").toLowerCase()}`;

  // load user & transaksi dari localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const storedTx = JSON.parse(localStorage.getItem(storageKey));
    if (storedTx) {
      setTransactions(storedTx);
    } else {
      setTransactions(transaksiList);
      localStorage.setItem(storageKey, JSON.stringify(transaksiList));
    }
  }, [storageKey]);

  // realtime sync dari halaman transfer
  useEffect(() => {
    const handleStorageUpdate = () => {
      const updated = JSON.parse(localStorage.getItem(storageKey));
      if (updated) setTransactions(updated);
    };

    window.addEventListener("transactions-updated", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("transactions-updated", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, [storageKey]);

  // statistik dari transaksi lokal
  const totalTransaksi = transactions.length;
  const berhasilCount = transactions.filter((t) => t.status === "Berhasil").length;
  const totalNominal = transactions
    .filter((t) => t.status === "Berhasil")
    .reduce((sum, t) => sum + (t.nominal || 0), 0);

  const COLORS = ["#2563eb", "#16a34a", "#f59e0b"];

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-600">
            Selamat Datang, {user?.name?.split(" ")[0] || "User"} 👋
          </h1>
          <p className="text-gray-500">Dashboard Ringkasan Transaksi Anda</p>
        </div>

        {/* Statistik Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <DashboardCard
            title="Saldo"
            value={`Rp ${(user?.saldo || 0).toLocaleString("id-ID")}`}
            color="blue"
          />
          <DashboardCard title="Total Transaksi" value={totalTransaksi} color="purple" />
          <DashboardCard title="Berhasil" value={berhasilCount} color="green" />
          <DashboardCard
            title="Total Nominal"
            value={`Rp ${totalNominal.toLocaleString("id-ID")}`}
            color="orange"
          />
          <DashboardCard title="Hari Ini" value={stats?.transaksiHariIni || 0} color="cyan" />
          <DashboardCard title="Incoming" value={stats?.incoming || 0} color="emerald" />
        </div>

        {/* Aktivitas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Aktivitas Terbaru
          </h2>
          <div className="space-y-3">
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{tx.tujuan}</p>
                    <p className="text-sm text-gray-500">{tx.catatan}</p>
                  </div>
                  <div className="text-right">
                    <p>Rp {(tx.nominal || 0).toLocaleString("id-ID")}</p>
                    <span className="text-xs">{tx.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 italic">Belum ada transaksi</p>
            )}
          </div>
        </div>

        {/* API Error */}
        {isError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            Gagal memuat data dashboard dari API
          </div>
        )}

        {/* Charts dari API */}
        {!isLoading && stats && (
          <>
            {/* Line Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="mb-4 font-semibold">Grafik Transaksi 7 Hari</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.chart7Days}>
                  <XAxis dataKey="tanggal" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="total" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="mb-4 font-semibold">Top Rekening Tujuan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.topTujuan}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="mb-4 font-semibold">Kategori Transaksi</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.kategoriChart}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {stats.kategoriChart.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

      </div>
    </AdminLayout>
  );
}
