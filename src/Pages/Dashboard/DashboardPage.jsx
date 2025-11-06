import { useEffect, useState } from "react";
import DashboardCard from "./Components/DashboardCard";
import { dummyUser, transaksiList } from "@/Data/Dummy";
import AdminLayout from "@/Layouts/AdminLayout";

export default function DashboardPage() {
  const [user, setUser] = useState(dummyUser);
  const [transactions, setTransactions] = useState([]);

  // Gunakan nama user untuk kunci unik di localStorage
  const storageKey = `transactions_${user.name.replace(/\s+/g, "_").toLowerCase()}`;

  // 🧠 Load data user & transaksi dari localStorage
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

  // Sinkronisasi real-time jika transaksi berubah di halaman Transfer
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

  // Statistik
  const totalTransaksi = transactions.length;
  const berhasilCount = transactions.filter((t) => t.status === "Berhasil").length;
  const totalNominal = transactions
    .filter((t) => t.status === "Berhasil")
    .reduce((sum, t) => sum + t.nominal, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-600">
            Selamat Datang, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500">Dashboard Ringkasan Transaksi Anda</p>
        </div>

        {/* Statistik Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <DashboardCard
            title="Saldo Anda"
            value={`Rp ${user.saldo.toLocaleString("id-ID")}`}
            color="blue"
          />
          <DashboardCard title="Total Transaksi" value={totalTransaksi} color="purple" />
          <DashboardCard title="Transaksi Berhasil" value={berhasilCount} color="green" />
          <DashboardCard
            title="Total Nominal Ditransfer"
            value={`Rp ${totalNominal.toLocaleString("id-ID")}`}
            color="orange"
          />
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Aktivitas Terbaru
          </h2>
          <div className="space-y-3">
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-none hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{tx.tujuan}</p>
                    <p className="text-sm text-gray-500">{tx.catatan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 font-semibold">
                      Rp {tx.nominal.toLocaleString("id-ID")}
                    </p>
                    <span
                      className={`text-xs font-medium ${
                        tx.status === "Berhasil"
                          ? "text-green-600"
                          : tx.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 italic py-4">
                Belum ada transaksi.
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}