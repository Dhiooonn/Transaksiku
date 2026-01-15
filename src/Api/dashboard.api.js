import { dummyUser, transaksiList } from "../Data/Dummy";

export const fetchDashboardStats = async () => {
  const totalSaldo = dummyUser.saldo;

  // tanggal hari ini (ambil dari data terbaru)
  const today = transaksiList[0]?.tanggal;

  const transaksiHariIni = transaksiList.filter(
    (t) => t.tanggal === today
  ).length;

  // Incoming vs Outgoing (simulasi)
  const incoming = transaksiList.filter((t) => t.kategori === "Top Up").length;
  const outgoing = transaksiList.filter((t) => t.kategori !== "Top Up").length;

  // Line Chart
  const grouped = {};
  transaksiList.forEach((t) => {
    grouped[t.tanggal] = (grouped[t.tanggal] || 0) + t.nominal;
  });

  const chart7Days = Object.keys(grouped).map((tgl) => ({
    tanggal: tgl,
    total: grouped[tgl],
  }));

  // Top tujuan
  const tujuanCount = {};
  transaksiList.forEach((t) => {
    tujuanCount[t.tujuan] = (tujuanCount[t.tujuan] || 0) + 1;
  });

  const topTujuan = Object.entries(tujuanCount).map(([name, total]) => ({
    name,
    total,
  }));

  // Pie kategori
  const kategoriCount = {};
  transaksiList.forEach((t) => {
    kategoriCount[t.kategori] = (kategoriCount[t.kategori] || 0) + 1;
  });

  const kategoriChart = Object.entries(kategoriCount).map(([name, value]) => ({
    name,
    value,
  }));

  return {
    totalSaldo,
    transaksiHariIni,
    incoming,
    outgoing,
    chart7Days,
    topTujuan,
    kategoriChart,
  };
};
