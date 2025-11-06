import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Jika belum login, arahkan ke halaman login
    return <Navigate to="/" replace />;
  }

  // Jika login, tampilkan halaman yang diminta
  return children;
}
