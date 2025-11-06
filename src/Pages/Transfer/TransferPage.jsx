import { useState, useEffect, useRef } from "react";
import { transaksiList } from "@/Data/Dummy";
import AdminLayout from "@/Layouts/AdminLayout";
import Header from "@/Components/Header";
import TransferForm from "./Components/TransferForm";
import TransactionList from "./Components/TransactionList";
import { toastSuccess } from "@/Utils/Helpers/ToastHelpers";

export default function TransferPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const storageKey = `transactions_${user?.name.replace(/\s+/g, "_").toLowerCase()}`;
  const [transactions, setTransactions] = useState([]);
  const isFirstRender = useRef(true);

  // Ambil data dari localStorage saat pertama kali
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    if (stored) {
      setTransactions(stored);
    } else {
      setTransactions(transaksiList);
      localStorage.setItem(storageKey, JSON.stringify(transaksiList));
    }
  }, [storageKey]);

  // Save ke localStorage setiap kali transaksi berubah
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(storageKey, JSON.stringify(transactions));
  }, [transactions, storageKey]);

  // Handle Transfer Baru
  const handleTransfer = (data) => {
    const newTx = {
      id: `TRX${String(transactions.length + 1).padStart(3, "0")}`,
      tanggal: new Date().toISOString().split("T")[0],
      ...data,
      status: "Berhasil",
    };

    const updated = [newTx, ...transactions];
    setTransactions(updated);

    // Simpan ke localStorage
    localStorage.setItem(storageKey, JSON.stringify(updated));

    // Kirim event sinkronisasi ke Dashboard
    window.dispatchEvent(new Event("transactions-updated"));
  };

  return (
    <AdminLayout>
      {/* Header */}
      <Header
        title="Dashboard Transfer"
        subtitle="Lakukan transfer dan pantau riwayat transaksi Anda."
      />

      <div className="flex flex-col gap-6">
        {/* Form Transfer */}
        <TransferForm onTransfer={handleTransfer} />

        {/* Riwayat Transaksi */}
        <TransactionList
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </div>
    </AdminLayout>
  );
}