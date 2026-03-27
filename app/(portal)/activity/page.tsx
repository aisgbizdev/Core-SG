"use client";

import { Clock3, Compass, Star, Workflow } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { SectionHeader } from "@/components/SectionHeader";
import { ActivityList } from "@/components/ActivityList";
import { StatsCard } from "@/components/StatsCard";

const activity = [
  { title: "Opened NM AI", time: "10:24 • Today", tag: "Launch" },
  { title: "Visited RiskGuard", time: "09:58 • Today", tag: "Risk" },
  { title: "Added BIAS to favorites", time: "Yesterday", tag: "Favorite" },
  { title: "Explored SGCC", time: "Yesterday", tag: "Comms" },
  { title: "Reviewed AiSG dashboards", time: "2 days ago", tag: "Audit" },
  { title: "Shared OCC link", time: "3 days ago", tag: "Operations" },
];

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <Topbar title="Activity" subtitle="A clear timeline of your moves" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Launches" value="27" trend="Past 7 days" icon={Compass} />
        <StatsCard label="Avg. session" value="12m" trend="Time on platform" icon={Clock3} />
        <StatsCard label="Signals" value="5" trend="New notifications" icon={Workflow} />
        <StatsCard label="Favorited" value="3" trend="Personal stack" icon={Star} />
      </div>

      <SectionHeader title="Timeline" subtitle="Latest actions across modules" />
      <div className="glass-panel rounded-3xl border border-white/10 p-6">
        <ActivityList items={activity} />
      </div>
    </div>
  );
}
