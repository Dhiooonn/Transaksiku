import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import { useState } from "react";
import { toastError, toastSuccess } from "@/Utils/Helpers/ToastHelpers";

export default function TransferForm({ onTransfer }) {
  const [tujuan, setTujuan] = useState("");
  const [nominal, setNominal] = useState("");
  const [catatan, setCatatan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tujuan || nominal < 1000) {
      toastError("Data tidak valid! Pastikan semua field terisi dan nominal ≥ 1000");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onTransfer({ tujuan, nominal: Number(nominal), catatan });
      toastSuccess("Transfer Berhasil!");
      setTujuan("");
      setNominal("");
      setCatatan("");
      setLoading(false);
    }, 2000);
  };

  return (
    <Card title="Form Transfer">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Nama Tujuan"
          placeholder="Masukkan nama penerima"
          value={tujuan}
          onChange={(e) => setTujuan(e.target.value)}
        />
        <Input
          label="Nominal"
          type="number"
          placeholder="Minimal Rp 1.000"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
        />
        <Input
          label="Catatan (Opsional)"
          textarea
          placeholder="Tambahkan pesan jika perlu"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
        />
        <Button type="submit" variant="primary" loading={loading}>
          Transfer Sekarang
        </Button>
      </form>
    </Card>
  );
}
