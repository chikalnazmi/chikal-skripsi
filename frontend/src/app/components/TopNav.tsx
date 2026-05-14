import { Bell as BellIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import netraLogo from "../../imports/Gemini_Generated_Image_jk75mijk75mijk75.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function TopNav() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Berhasil keluar");
      navigate('/login');
    } catch {
      toast.error("Gagal keluar, coba lagi");
    }
  };

  return (
    <header className="h-16 bg-[#fcfaf6] flex items-center justify-between px-6 lg:px-10 border-b border-[#f1efe9] shadow-[0_4px_24px_rgba(35,56,79,0.02)] z-10">
      <div className="flex-1 flex items-center">
        {!isAdmin && (
          <ImageWithFallback src={netraLogo} alt="NETRA Logo" className="h-8 object-contain mr-4" />
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-[#23384f]/40 hover:text-[#23384f] transition-colors">
          <BellIcon size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-400 rounded-full border border-white"></span>
        </button>
        <div className="h-8 w-[1px] bg-[#f1efe9] mx-1"></div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-[#23384f] leading-none">
              {user?.nama || 'Pengguna'}
            </p>
            <p className="text-xs text-[#23384f]/60 mt-1">
              {isAdmin ? 'Admin' : 'User'}
            </p>
          </div>
        </div>

        <div className="h-8 w-[1px] bg-[#f1efe9] mx-1"></div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          title="Keluar"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium hidden sm:block">Keluar</span>
        </button>
      </div>
    </header>
  );
}
