"use client";

import { categories, statuses } from "@/lib/status";
import { cn } from "@/lib/utils";
import { LayoutGrid, List } from "lucide-react";
import { SearchInput } from "./SearchInput";

interface FilterBarProps {
  search: string;
  onSearch: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  layout: "grid" | "list";
  onLayoutChange: (value: "grid" | "list") => void;
}

export function FilterBar({
  search,
  onSearch,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  layout,
  onLayoutChange,
}: FilterBarProps) {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-4 space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search projects"
          className="lg:w-1/2"
        />
        <div className="flex items-center gap-2">
          <button
            className={cn(
              "h-11 w-11 rounded-2xl border flex items-center justify-center",
              layout === "grid"
                ? "border-cyan-400/40 bg-cyan-500/10"
                : "border-white/10 bg-white/5"
            )}
            onClick={() => onLayoutChange("grid")}
            aria-label="Grid layout"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            className={cn(
              "h-11 w-11 rounded-2xl border flex items-center justify-center",
              layout === "list"
                ? "border-cyan-400/40 bg-cyan-500/10"
                : "border-white/10 bg-white/5"
            )}
            onClick={() => onLayoutChange("list")}
            aria-label="List layout"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <FilterChip
          label="All Categories"
          active={category === "all"}
          onClick={() => onCategoryChange("all")}
        />
        {categories.map((c) => (
          <FilterChip
            key={c}
            label={c}
            active={category === c}
            onClick={() => onCategoryChange(c)}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <FilterChip
          label="All Status"
          active={status === "all"}
          onClick={() => onStatusChange("all")}
        />
        {statuses.map((s) => (
          <FilterChip
            key={s}
            label={s}
            active={status === s}
            onClick={() => onStatusChange(s)}
          />
        ))}
      </div>
    </div>
  );
}

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm border transition-all",
        active
          ? "border-cyan-400/50 bg-cyan-500/15 text-white shadow-lg shadow-cyan-500/20"
          : "border-white/10 bg-white/5 text-muted hover:text-white"
      )}
    >
      {label}
    </button>
  );
}
