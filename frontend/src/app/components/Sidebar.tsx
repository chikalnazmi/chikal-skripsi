import { NavLink, useNavigate } from "react-router";
import { LayoutDashboard, BarChart3, Users, LogOut } from "lucide-react";
import clsx from "clsx";
import netraLogo from "../../imports/Gemini_Generated_Image_jk75mijk75mijk75.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function Sidebar() {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();

  const navItems = isAdmin
    ? [
        { to: "/admin", icon: BarChart3, label: "Dashboard" },
        { to: "/", icon: LayoutDashboard, label: "Workspace" },
        { to: "/admin/users", icon: Users, label: "Manajemen Pengguna" },
      ]
    : [
        { to: "/", icon: LayoutDashboard, label: "Workspace" },
      ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Berhasil keluar");
      navigate('/login');
    } catch {
      toast.error("Gagal keluar");
    }
  };

  return (
    <aside className="w-64 bg-[#fcfaf6] border-r border-[#f1efe9] flex flex-col shadow-[4px_0_24px_rgba(35,56,79,0.02)] z-10 shrink-0">
      <div className="h-16 flex items-center gap-3 px-6 border-b border-[#f1efe9]">
        <div className="w-9 h-9 rounded-lg bg-[#f1efe9] flex items-center justify-center overflow-hidden shrink-0">
          <ImageWithFallback src={netraLogo} alt="NETRA Logo" className="w-9 h-9 object-contain" />
        </div>
        <span className="font-bold text-[#23384f] tracking-tight">NETRA</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/" || item.to === "/admin"}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200",
                isActive
                  ? "bg-[#23384f] text-[#fcfaf6] shadow-sm"
                  : "text-[#23384f]/60 hover:bg-[#f1efe9] hover:text-[#23384f]"
              )
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#f1efe9]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-[#23384f]/60 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
