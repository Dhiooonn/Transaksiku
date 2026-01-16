import { transaksiList } from "@/Data/Dummy";

let rekeningDB = transaksiList.map((t, i) => ({
  id: i + 1,
  nama: t.tujuan,
  bank: t.bank,
  nomor: t.nomor,
  createdAt: t.tanggal,
}));

const delay = () => new Promise((r) => setTimeout(r, 400));

export const getRekening = async ({ page = 1, search = "", bank = "", sort = "nama" }) => {
  await delay();

  let data = [...rekeningDB];

  if (search) {
    data = data.filter((r) =>
      r.nama.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (bank) data = data.filter((r) => r.bank === bank);

  data.sort((a, b) => a[sort].localeCompare(b[sort]));

  const perPage = 5;
  const total = data.length;
  const start = (page - 1) * perPage;
  const paged = data.slice(start, start + perPage);

  return { data: paged, total };
};

export const createRekening = async (data) => {
  await delay();

  if (!/^\d{8,16}$/.test(data.nomor))
    throw new Error("Nomor rekening tidak valid");

  if (rekeningDB.some((r) => r.nomor === data.nomor))
    throw new Error("Nomor rekening sudah terdaftar");

  const item = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
  rekeningDB.push(item);
  return item;
};

export const updateRekening = async (id, data) => {
  await delay();
  const idx = rekeningDB.findIndex((r) => r.id === id);
  rekeningDB[idx] = { ...rekeningDB[idx], ...data };
  return rekeningDB[idx];
};

export const deleteRekening = async (id) => {
  await delay();
  rekeningDB = rekeningDB.filter((r) => r.id !== id);
};

export const bulkDeleteRekening = async (ids) => {
  await delay();
  rekeningDB = rekeningDB.filter((r) => !ids.includes(r.id));
};
