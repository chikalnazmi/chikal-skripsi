import { useState, useEffect } from "react";
import { FileText, RefreshCw, CheckCircle2, Users, Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { StatCard } from "../components/StatCard";
import api from "../../lib/api";
import { toast } from "sonner";

export function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState("7");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/dashboard?range=${timeFilter}`);
      setData(res.data);
    } catch {
      toast.error("Gagal memuat data dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [timeFilter]);

  if (isLoading || !data) {
    return <div className="h-full flex items-center justify-center text-[#23384f]/60">Memuat data dashboard...</div>;
  }

  return (
    <div className="min-h-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#23384f] mb-1">Dasbor Analitik</h1>
          <p className="text-[#23384f]/60 text-sm">Ringkasan performa sistem dan metrik pengguna.</p>
        </div>
        
        <div className="relative">
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="flex items-center gap-2 bg-[#fcfaf6] border border-[#f1efe9] rounded-xl px-4 py-2 pr-8 text-sm text-[#23384f]/80 shadow-[0_2px_10px_rgba(35,56,79,0.02)] cursor-pointer hover:bg-[#fcfaf6] transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-[#23384f]/20 h-[38px]"
          >
            <option value="1">Hari ini</option>
            <option value="7">7 hari terakhir</option>
            <option value="14">14 hari terakhir</option>
            <option value="30">30 hari terakhir</option>
          </select>
          <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#23384f]/40 pointer-events-none" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Unggah" value={data.total_inputs.toLocaleString()} icon={FileText} colorScheme="blue" />
        <StatCard title="Sedang Diproses" value={data.processing.toLocaleString()} icon={RefreshCw} colorScheme="orange" />
        <StatCard title="Selesai" value={data.completed.toLocaleString()} icon={CheckCircle2} colorScheme="green" />
        <StatCard title="Pengguna Terdaftar" value={data.total_users.toLocaleString()} icon={Users} colorScheme="purple" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line/Area Chart */}
        <div className="bg-[#fcfaf6] p-6 rounded-3xl border border-[#f1efe9] shadow-[0_4px_20px_rgba(35,56,79,0.02)] lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#23384f]">Tren Unggahan</h3>
            <p className="text-sm text-[#23384f]/60">Jumlah dokumen yang diunggah dalam {timeFilter} hari terakhir</p>
          </div>
          <div className="h-72 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trend_data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#23384f" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#23384f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(35,56,79,0.4)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(35,56,79,0.4)', fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1efe9" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(35,56,79,0.08)' }}
                  itemStyle={{ color: '#23384f', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="uploads" stroke="#23384f" strokeWidth={3} fillOpacity={1} fill="url(#colorUploads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-[#fcfaf6] p-6 rounded-3xl border border-[#f1efe9] shadow-[0_4px_20px_rgba(35,56,79,0.02)]">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-[#23384f]">Rasio Status Pemrosesan</h3>
            <p className="text-sm text-[#23384f]/60">Distribusi status dokumen</p>
          </div>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.status_data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                >
                  {data.status_data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(35,56,79,0.08)' }}
                  itemStyle={{ color: '#23384f', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-[#23384f]">{data.total_inputs > 0 ? '100%' : '0%'}</span>
              <span className="text-xs text-[#23384f]/60">Total Data</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {data.status_data.map((item: any) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs font-medium text-[#23384f]/80">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
