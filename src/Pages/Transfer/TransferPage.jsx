import { useState, useEffect, useRef } from "react";
import { transaksiList } from "@/Data/Dummy"; // Pastikan path ini benar
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowRightLeft, History } from "lucide-react";

// Components
import TransferForm from "./Components/TransferForm";
import TransactionList from "./Components/TransactionList";

export default function TransferPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const storageKey = `transactions_${user?.name.replace(/\s+/g, "_").toLowerCase()}`;
  const [transactions, setTransactions] = useState([]);
  const isFirstRender = useRef(true);

  // Load Data
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    if (stored) {
      setTransactions(stored);
    } else {
      setTransactions(transaksiList);
      localStorage.setItem(storageKey, JSON.stringify(transaksiList));
    }
  }, [storageKey]);

  // Sync to Storage
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(storageKey, JSON.stringify(transactions));
  }, [transactions, storageKey]);

  // Handle Transfer Logic
  const handleTransfer = (data) => {
    const newTx = {
      id: `TRX${String(transactions.length + 1).padStart(3, "0")}`,
      tanggal: new Date().toISOString().split("T")[0],
      ...data,
      status: "Berhasil",
    };

    const updated = [newTx, ...transactions];
    setTransactions(updated);
    
    // Trigger event untuk update dashboard realtime
    window.dispatchEvent(new Event("transactions-updated"));
  };

  return (
    <AdminLayout>
      <div className="font-sans text-slate-800 space-y-8 p-2">
        
        {/* Header */}
        <div className="flex flex-col gap-1">
           <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-xl text-white">
                <ArrowRightLeft size={24} />
             </div>
             Transfer Dana
           </h1>
           <p className="text-slate-500 font-medium ml-[3.25rem]">
             Kirim uang dengan aman dan pantau riwayat transaksi Anda.
           </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Kolom Kiri: Form Transfer */}
          <div className="xl:col-span-1">
             <TransferForm onTransfer={handleTransfer} />
          </div>

          {/* Kolom Kanan: Riwayat Transaksi */}
          <div className="xl:col-span-2">
             <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 min-h-[600px]">
                <div className="flex items-center gap-3 mb-6">
                   <div className="bg-orange-50 p-2 rounded-lg text-orange-500">
                      <History size={20} />
                   </div>
                   <h2 className="text-xl font-bold text-slate-800">Riwayat Transaksi</h2>
                </div>
                
                <TransactionList 
                  transactions={transactions} 
                  setTransactions={setTransactions} 
                />
             </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}