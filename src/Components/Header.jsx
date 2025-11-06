export default function Header({ title, subtitle }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex justify-between items-center mb-6 bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
      {/* Left - Title Page */}
      <div>
        <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>

      {/* Right - Informasi User */}
      <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col text-right">
          <span className="text-sm font-semibold text-gray-800">
            {user?.name}
          </span>
          <span className="text-xs text-gray-500">
            Saldo: Rp {user?.saldo.toLocaleString("id-ID")}
          </span>
        </div>

        {/* Profile */}
        <img
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${user?.name}`}
          alt="user"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
}