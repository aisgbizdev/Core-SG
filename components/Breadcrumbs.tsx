import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      {items.map((item, idx) => (
        <span key={item.label} className="flex items-center gap-2">
          {idx === items.length - 1 ? (
            <span className="text-white font-semibold">{item.label}</span>
          ) : (
            <Link href={item.href ?? "#"} className={cn("text-cyan-200 hover:text-white font-medium")}> 
              {idx === 0 && <ArrowLeft className="h-4 w-4 inline mr-1" />} {item.label}
            </Link>
          )}
          {idx !== items.length - 1 && <span className="text-muted">/</span>}
        </span>
      ))}
    </div>
  );
}
