import { useEffect, useState } from "react";
import { dummyUser, transaksiList } from "@/Data/Dummy";
import AdminLayout from "@/Layouts/AdminLayout";
import { useDashboard } from "@/Utils/hooks/useDashboard";
import { ShoppingBag, Users, Activity, ArrowUpRight } from "lucide-react";

// --- IMPORT COMPONENTS DARI FOLDER LOKAL ---
import DashboardHeader from "./Components/DashboardHeader";
import BalanceCard from "./Components/BalanceCard";
import DashboardCard from "./Components/DashboardCard";
import RecentActivity from "./Components/RecentActivity";
import TransactionChart from "./Components/Charts/TransactionChart";
import CategoryChart from "./Components/Charts/CategoryChart";

export default function DashboardPage() {
  const [user, setUser] = useState(dummyUser);
  const [transactions, setTransactions] = useState([]);
  
  // React Query & Logic
  const { data: stats, isLoading } = useDashboard();
  const storageKey = `transactions_${user.name.replace(/\s+/g, "_").toLowerCase()}`;

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

  // Realtime sync listener
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

  // Statistik Lokal
  const totalTransaksi = transactions.length;
  const berhasilCount = transactions.filter((t) => t.status === "Berhasil").length;
  const totalNominal = transactions
    .filter((t) => t.status === "Berhasil")
    .reduce((sum, t) => sum + (t.nominal || 0), 0);

  return (
    <AdminLayout>
      <div className="font-sans text-slate-800 space-y-8 p-2">
        
        {/* 1. Header */}
        <DashboardHeader user={user} />

        {/* 2. Hero Cards (Balance & Stats) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Kartu Saldo Biru */}
          <BalanceCard user={user} />

          {/* Grid Kartu Kecil */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DashboardCard 
              title="Total Transaksi" 
              value={totalTransaksi} 
              color="orange" 
              icon={ShoppingBag} 
              trend="+12.4%" 
            />
            <DashboardCard 
              title="Total Nominal" 
              value={`Rp ${totalNominal.toLocaleString("id-ID")}`} 
              color="purple" 
              icon={Activity} 
              trend="+8.1%" 
            />
            <DashboardCard 
              title="Berhasil" 
              value={berhasilCount} 
              color="cyan" 
              icon={Users} 
              trend="-2.1%" 
            />
            <DashboardCard 
              title="Incoming (Hari Ini)" 
              value={stats?.transaksiHariIni || 0} 
              color="green" 
              icon={ArrowUpRight} 
              trend="+4.5%" 
            />
          </div>
        </div>

        {/* 3. Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2">
              <TransactionChart data={stats?.chart7Days} isLoading={isLoading} />
           </div>
           <div>
              <CategoryChart data={stats?.kategoriChart} isLoading={isLoading} />
           </div>
        </div>

        {/* 4. Recent Activity */}
        <RecentActivity transactions={transactions} />

      </div>
    </AdminLayout>
  );
}