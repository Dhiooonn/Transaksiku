import Sidebar from "@/Components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar fix di kiri */}
      <Sidebar />

      {/* Konten utama */}
      <main className="fixed left-64 right-0 top-0 bottom-0 overflow-y-auto p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
