import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export default function DashboardCard({ 
  title, 
  value, 
  color = "blue", 
  icon: Icon = Activity, // Default icon jika tidak ada props icon
  trend = "+0%" // Default trend
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mapping warna untuk Icon Background & Text
  const colorStyles = {
    blue:   "bg-blue-50 text-blue-600",
    green:  "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
    red:    "bg-red-50 text-red-600",
    cyan:   "bg-cyan-50 text-cyan-600",
  };

  // Tentukan warna trend (Hijau jika positif, Merah jika negatif/turun)
  const isPositive = !trend.includes("-");
  const trendColor = isPositive ? "text-emerald-500 bg-emerald-50" : "text-red-500 bg-red-50";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      className={`
        bg-white rounded-[2rem] p-6 
        border border-slate-100 shadow-sm 
        flex flex-col justify-between
        transition-all duration-700 ease-out transform
        hover:shadow-lg hover:-translate-y-1
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      {/* Header: Icon & Trend Badge */}
      <div className="flex justify-between items-start mb-4">
        {/* Icon Box */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorStyles[color] || colorStyles.blue}`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>

        {/* Trend Badge */}
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${trendColor}`}>
          <TrendIcon size={12} />
          <span>{trend}</span>
        </div>
      </div>

      {/* Content: Title & Value */}
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
          {value || "-"}
        </h3>
      </div>
    </div>
  );
}