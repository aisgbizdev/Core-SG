"use client";

import { Monitor, Moon, SlidersHorizontal, Sparkles, Zap } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { SettingsCard } from "@/components/SettingsCard";
import { usePreferences } from "@/hooks/usePreferences";
import { SectionHeader } from "@/components/SectionHeader";

export default function SettingsPage() {
  const { preferences, updatePreference, hydrated } = usePreferences();

  return (
    <div className="space-y-6">
      <Topbar title="Settings" subtitle="Tailor the Core SG experience" />

      <SectionHeader
        title="Theme Preview"
        subtitle="See how your portal styling feels"
      />
      <div className="grid gap-4 lg:grid-cols-[1.1fr,1fr]">
        <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Active Theme</p>
              <p className="text-xl font-semibold text-white">{preferences.theme === "dark" ? "Midnight" : "Lumen"}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/40" />
              <span className="text-xs text-muted">Live</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-600/20 p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_35%)]" />
            <div className="relative space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/20" />
                <div className="flex-1 h-3 rounded-full bg-white/20" />
              </div>
              <div className="flex gap-2">
                <div className="h-20 flex-1 rounded-2xl bg-white/10 border border-white/15" />
                <div className="h-20 flex-1 rounded-2xl bg-white/10 border border-white/15" />
              </div>
              <div className="h-3 w-1/2 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="text-xs text-muted">Preview adapts instantly as you toggle controls.</div>
        </div>
        <div className="space-y-3">
          <SettingsCard
            title="Theme"
            description="Switch between dark and light skins"
            icon={Moon}
            value={preferences.theme}
            type="select"
            options={[
              { label: "Dark", value: "dark" },
              { label: "Light", value: "light" },
            ]}
            onChange={(value) => updatePreference("theme", value as "dark" | "light")}
          />
          <SettingsCard
            title="Compact mode"
            description="Tighten spacing for dense overviews"
            icon={SlidersHorizontal}
            value={preferences.compactMode}
            onChange={(value) => updatePreference("compactMode", Boolean(value))}
          />
          <SettingsCard
            title="Animations"
            description="Subtle motion and hover cues"
            icon={Sparkles}
            value={preferences.animations}
            onChange={(value) => updatePreference("animations", Boolean(value))}
          />
          <SettingsCard
            title="Notifications"
            description="Activity signals and alerts"
            icon={Zap}
            value={preferences.notifications}
            onChange={(value) => updatePreference("notifications", Boolean(value))}
          />
          <SettingsCard
            title="Layout preference"
            description="Default grid or list for modules"
            icon={Monitor}
            value={preferences.layout}
            type="select"
            options={[
              { label: "Grid", value: "grid" },
              { label: "List", value: "list" },
            ]}
            onChange={(value) => updatePreference("layout", value as "grid" | "list")}
          />
        </div>
      </div>

      {!hydrated && (
        <div className="text-sm text-muted">Loading your saved preferences…</div>
      )}
    </div>
  );
}
