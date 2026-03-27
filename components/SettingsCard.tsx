"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  value: boolean | string;
  onChange?: (value: boolean | string) => void;
  type?: "toggle" | "select";
  options?: { label: string; value: string }[];
}

export function SettingsCard({
  title,
  description,
  icon: Icon,
  value,
  onChange,
  type = "toggle",
  options,
}: SettingsCardProps) {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-5 flex items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-100">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-white font-semibold">{title}</p>
          <p className="text-sm text-muted">{description}</p>
        </div>
      </div>
      {type === "toggle" ? (
        <Toggle active={Boolean(value)} onChange={() => onChange?.(!value)} />
      ) : (
        <Select value={String(value)} options={options ?? []} onChange={onChange} />
      )}
    </div>
  );
}

function Toggle({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "relative h-9 w-16 rounded-full border transition-all",
        active
          ? "bg-cyan-500/40 border-cyan-400/60"
          : "bg-white/5 border-white/15"
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-7 w-7 rounded-full bg-white shadow-md transition-all",
          active ? "right-1" : "left-1"
        )}
      />
    </button>
  );
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-gray-900">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
