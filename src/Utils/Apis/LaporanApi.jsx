import { transaksiList } from "@/Data/Dummy";

const delay = () => new Promise((r) => setTimeout(r, 400));

export const getLaporan = async ({ from, to, min, max, status, tujuan }) => {
  await delay();

  let data = [...transaksiList];

  if (from && to) {
    data = data.filter(t => t.tanggal >= from && t.tanggal <= to);
  }

  if (min) data = data.filter(t => t.nominal >= min);
  if (max) data = data.filter(t => t.nominal <= max);
  if (status) data = data.filter(t => t.status === status);
  if (tujuan) data = data.filter(t => t.tujuan === tujuan);

  const totalNominal = data.reduce((s, t) => s + t.nominal, 0);
  const avg = data.length ? totalNominal / data.length : 0;

  // trend
  const trend = {};
  data.forEach(t => {
    trend[t.tanggal] = (trend[t.tanggal] || 0) + t.nominal;
  });

  // status pie
  const statusMap = {};
  data.forEach(t => {
    statusMap[t.status] = (statusMap[t.status] || 0) + 1;
  });

  // top recipients
  const rec = {};
  data.forEach(t => {
    rec[t.tujuan] = (rec[t.tujuan] || 0) + 1;
  });

  return {
    data,
    summary: {
      total: data.length,
      totalNominal,
      avg
    },
    trend: Object.entries(trend).map(([tanggal, total]) => ({ tanggal, total })),
    statusPie: Object.entries(statusMap).map(([name, value]) => ({ name, value })),
    topRecipients: Object.entries(rec)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  };
};
