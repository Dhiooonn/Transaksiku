export default function RekeningTable({ data, selected, setSelected, onEdit, onDelete }) {
  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th></th>
            <th>Nama</th>
            <th>Nomor</th>
            <th>Bank</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="border-t">
              <td>
                <input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggle(r.id)} />
              </td>
              <td>{r.nama}</td>
              <td>{r.nomor}</td>
              <td>{r.bank}</td>
              <td className="space-x-2">
                <button onClick={() => onEdit(r)} className="text-blue-600">Edit</button>
                <button onClick={() => onDelete(r.id)} className="text-red-600">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
