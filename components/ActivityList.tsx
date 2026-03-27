import { cn } from "@/lib/utils";
import { Clock3, Dot } from "lucide-react";

export interface ActivityItem {
  title: string;
  time: string;
  tag?: string;
}

interface ActivityListProps {
  items: ActivityItem[];
  className?: string;
}

export function ActivityList({ items, className }: ActivityListProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative pl-6 border-l border-white/10 last:border-l-0"
        >
          <div className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/40" />
          <p className="text-sm text-white font-semibold">{item.title}</p>
          <div className="flex items-center gap-2 text-xs text-muted mt-1">
            <Clock3 className="h-4 w-4" />
            <span>{item.time}</span>
            {item.tag && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-cyan-100 bg-cyan-500/10">
                <Dot className="h-4 w-4" />
                {item.tag}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
