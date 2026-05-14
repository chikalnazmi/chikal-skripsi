import { createBrowserRouter, Navigate } from "react-router";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminUsers } from "./pages/AdminUsers";
import { useAuth } from "./context/AuthContext";

// Guard: hanya bisa akses jika sudah login
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-full flex items-center justify-center text-[#23384f]/60">Memuat...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// Guard: hanya Admin yang bisa akses
function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div className="h-full flex items-center justify-center text-[#23384f]/60">Memuat...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: <RequireAuth><DashboardLayout /></RequireAuth>,
    children: [
      { index: true, Component: Dashboard },
      { path: "admin", element: <RequireAdmin><AdminDashboard /></RequireAdmin> },
      { path: "admin/users", element: <RequireAdmin><AdminUsers /></RequireAdmin> },
    ],
  },
]);
