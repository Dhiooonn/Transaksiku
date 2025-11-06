export default function TransactionCard({ data }) {
  return (
    <div className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center">
      <div>
        <h4 className="font-medium">{data.tujuan}</h4>
        <p className="text-sm text-gray-500">{data.catatan || "-"}</p>
        <p className="text-xs text-gray-400">{data.tanggal}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-blue-600">
          Rp {data.nominal.toLocaleString("id-ID")}
        </p>
        <span
          className={`text-xs font-medium ${
            data.status === "Berhasil"
              ? "text-green-600"
              : data.status === "Pending"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {data.status}
        </span>
      </div>
    </div>
  );
}
