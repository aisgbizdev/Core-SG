import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  trend?: string;
  icon: LucideIcon;
  accent?: string;
}

export function StatsCard({ label, value, trend, icon: Icon, accent }: StatsCardProps) {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-4 flex items-center justify-between gap-3">
      <div>
        <p className="text-sm text-muted">{label}</p>
        <p className="text-2xl font-semibold text-white">{value}</p>
        {trend && <p className="text-xs text-cyan-200 mt-1">{trend}</p>}
      </div>
      <div
        className={cn(
          "h-12 w-12 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5",
          accent
        )}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}
