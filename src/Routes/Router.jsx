import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/Pages/Auth/Login";
import TransferPage from "@/Pages/Transfer/TransferPage";
import DashboardPage from "@/Pages/Dashboard/DashboardPage";
import AdminLayout from "@/Layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute"; 
import { Toaster } from "react-hot-toast";

export default function Router() {
  return (
    <BrowserRouter>
      {/* Notifikasi Toast */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            JSON.parse(localStorage.getItem("user"))
              ? <Navigate to="/admin/dashboard" replace />
              : <Login />
          }
        />

        {/* Dashboard (Protected) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <DashboardPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Transfer (Protected) */}
        <Route
          path="/admin/transfer"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <TransferPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}