import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl border border-dashed border-white/15 p-8 text-center space-y-3",
        className
      )}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-cyan-200">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
      {action}
    </div>
  );
}
