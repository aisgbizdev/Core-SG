"use client";

import { useEffect } from "react";
import { Bell, SunMoon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/hooks/usePreferences";

interface TopbarProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Topbar({ title, subtitle, children, className }: TopbarProps) {
  const { preferences, updatePreference, hydrated } = usePreferences();

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dataset.theme = preferences.theme;
  }, [preferences.theme, hydrated]);

  const toggleTheme = () =>
    updatePreference("theme", preferences.theme === "dark" ? "light" : "dark");

  return (
    <header
      className={cn(
        "glass-panel rounded-3xl border border-white/10 px-6 py-4 flex items-center justify-between gap-4",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Core SG</p>
          <h1 className="text-2xl font-semibold text-white leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {children}
        <button className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all">
          <Bell className="h-5 w-5" />
        </button>
        <button
          onClick={toggleTheme}
          className={cn(
            "h-10 w-10 rounded-2xl border flex items-center justify-center transition-all",
            preferences.theme === "light"
              ? "border-amber-400/60 bg-amber-500/15 text-amber-50"
              : "border-white/10 bg-white/5 text-white hover:border-cyan-400/40 hover:bg-cyan-500/10"
          )}
          aria-label="Toggle theme"
        >
          <SunMoon className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
