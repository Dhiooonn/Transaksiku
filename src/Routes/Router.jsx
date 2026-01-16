import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/Pages/Auth/Login";
import TransferPage from "@/Pages/Transfer/TransferPage";
import DashboardPage from "@/Pages/Dashboard/DashboardPage";
import RekeningPage from "@/Pages/Rekening/RekeningPage";
import LaporanPage from "@/Pages/Laporan/LaporanPage";
import SettingsPage from "@/Pages/Settings/SettingsPage";
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

        {/* Rekening */}
         <Route
          path="/admin/rekening"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <RekeningPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Laporan */}
         <Route
          path="/admin/laporan"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <LaporanPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Setting */}
         <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <SettingsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}