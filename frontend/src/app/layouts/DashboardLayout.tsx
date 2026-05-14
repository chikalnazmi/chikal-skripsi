import { Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/TopNav";

export function DashboardLayout() {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Tampilkan sidebar jika user adalah admin
  const showSidebar = isAdmin || isAdminRoute;

  return (
    <div className="flex h-screen w-full bg-[#f1efe9] overflow-hidden text-[#23384f]">
      {showSidebar && <Sidebar />}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#f1efe9]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
