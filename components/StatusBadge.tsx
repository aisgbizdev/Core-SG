import { ProjectStatus } from "@/types/project";
import { statusStyles } from "@/lib/status";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ProjectStatus;
  compact?: boolean;
}

export function StatusBadge({ status, compact }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        statusStyles[status],
        compact && "text-[10px] px-2"
      )}
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
