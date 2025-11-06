import { useNavigate, useLocation } from "react-router-dom";
import { confirmLogout } from "@/Utils/Helpers/SwalHelpers";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    const result = await confirmLogout();
    if (result.isConfirmed) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Transfer",
      path: "/admin/transfer",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      {/* Header */}
      <div>
        <h2
          onClick={() => navigate("/admin/transfer")}
          className="text-2xl font-bold text-blue-600 mb-8 cursor-pointer select-none hover:text-blue-700 transition"
        >
          Transaksiku
        </h2>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 w-full text-left p-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
    </aside>
  );
}