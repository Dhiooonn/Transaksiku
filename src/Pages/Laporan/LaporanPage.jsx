import { useState } from "react";
import { useLaporan } from "@/Utils/hooks/useLaporan";
import { FileBarChart } from "lucide-react";

// Components
import LaporanFilter from "./Components/LaporanFilter";
import LaporanSummary from "./Components/LaporanSummary";
import LaporanChart from "./Components/LaporanChart";
import LaporanStatusPie from "./Components/LaporanStatusPie";
import LaporanTopRecipient from "./Components/LaporanTopRecipient";

export default function LaporanPage() {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    min: "",
    max: "",
    status: "",
    tujuan: "",
  });

  const { data, isLoading } = useLaporan(filters);

  return (
    <div className="font-sans text-slate-800 space-y-8 p-2">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
         <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
           <div className="bg-blue-600 p-2 rounded-xl text-white">
              <FileBarChart size={24} />
           </div>
           Laporan Transaksi
         </h1>
         <p className="text-slate-500 font-medium ml-[3.25rem]">
           Analisis mendalam mengenai arus kas dan riwayat transaksi Anda.
         </p>
      </div>

      {/* Filter Section */}
      <LaporanFilter filters={filters} setFilters={setFilters} />

      {/* Content Area */}
      {isLoading ? (
        <div className="h-96 w-full bg-slate-100 rounded-[2rem] animate-pulse"></div>
      ) : (
        <>
          {/* Summary Cards */}
          <LaporanSummary summary={data?.summary || { total: 0, totalNominal: 0, avg: 0 }} />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trend Chart (2/3 width) */}
            <div className="lg:col-span-2">
              <LaporanChart data={data?.trend || []} />
            </div>
            
            {/* Status Pie (1/3 width) */}
            <div>
              <LaporanStatusPie data={data?.statusPie || []} />
            </div>
          </div>

          {/* Top Recipient (Full Width) */}
          <LaporanTopRecipient data={data?.topRecipients || []} />
        </>
      )}
    </div>
  );
}