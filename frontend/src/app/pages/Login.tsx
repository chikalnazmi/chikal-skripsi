import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock } from "lucide-react";
import { toast } from "sonner";
import netraLogo from "../../imports/Gemini_Generated_Image_jk75mijk75mijk75.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login(username.trim(), password);
      toast.success("Berhasil masuk!");
      if (res && res.id_role === 1) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Username atau password salah";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex bg-[#fcfaf6] text-[#23384f] font-sans">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#fcfaf6] to-[#f1efe9] items-center justify-center overflow-hidden border-r border-[#23384f]/5">
        <div className="relative z-10 flex flex-col items-center text-center p-12">
          <div className="p-8 rounded-[2.5rem] bg-[#fcfaf6]/60 backdrop-blur-md shadow-[0_8px_32px_rgba(35,56,79,0.04)] border border-[#23384f]/5 mb-10 flex items-center justify-center transform transition-transform hover:scale-105 duration-500">
            <ImageWithFallback src={netraLogo} alt="NETRA Logo" className="w-36 object-contain" />
          </div>
          <h1 className="text-5xl font-extrabold text-[#23384f] mb-5 tracking-tight">NETRA</h1>
          <p className="text-[#23384f]/70 max-w-md text-xl leading-relaxed font-medium">
            Platform cerdas ekstraksi dan analisis tata letak surat kabar otomatis.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 bg-[#f1efe9] h-full overflow-y-auto">
        <div className="w-full max-w-md bg-[#fcfaf6] rounded-[24px] p-8 sm:p-10 shadow-[0_12px_40px_rgba(35,56,79,0.08)] border border-[#e8e5dc] my-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#23384f] mb-2">Masuk ke Akun Anda</h2>
            <p className="text-[#23384f]/60 text-sm">Selamat datang kembali! Silakan masukkan detail Anda.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-[#23384f] ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-11 pr-4 py-3 bg-[#f1efe9]/40 border border-[#e8e5dc] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#23384f]/20 focus:border-[#23384f]/50 transition-all text-[#23384f]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-[#23384f] ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#23384f]/40" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[#f1efe9]/40 border border-[#e8e5dc] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#23384f]/20 focus:border-[#23384f]/50 transition-all text-[#23384f]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 bg-[#23384f] hover:bg-[#1a2a3b] text-[#fcfaf6] rounded-xl font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
