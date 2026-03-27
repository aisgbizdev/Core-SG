"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function SearchInput({ label, className, ...props }: SearchInputProps) {
  return (
    <label className={cn("relative w-full", className)}>
      {label && <span className="sr-only">{label}</span>}
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
      <input
        {...props}
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3 text-white",
          "placeholder:text-muted/80 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/40",
          "backdrop-blur"
        )}
      />
    </label>
  );
}
