import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  colorScheme: "pink" | "orange" | "green" | "purple" | "blue";
}

export function StatCard({ title, value, icon: Icon, colorScheme }: StatCardProps) {
  const colorStyles = {
    pink: "bg-pink-50 text-pink-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-[#f1efe9] text-[#23384f]",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="bg-[#fcfaf6] p-6 rounded-3xl border border-[#f1efe9] shadow-[0_4px_20px_rgba(35,56,79,0.02)] flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${colorStyles[colorScheme]}`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-sm font-medium text-[#23384f]/60 mb-1">{title}</p>
        <p className="text-2xl font-bold text-[#23384f] tracking-tight">{value}</p>
      </div>
    </div>
  );
}
