"use client";

import { Building2, CheckCircle, Cpu, Shield } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { ProfileCard } from "@/components/ProfileCard";
import { SectionHeader } from "@/components/SectionHeader";
import { StatsCard } from "@/components/StatsCard";
import { ActivityList } from "@/components/ActivityList";

const highlights = [
  { title: "Opened NM AI", time: "Today" },
  { title: "Favorited BIAS", time: "Yesterday" },
  { title: "Reviewed RiskGuard", time: "2 days ago" },
];

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Topbar title="Profile" subtitle="Who you are inside Core SG" />

      <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <ProfileCard
            name="Avery Tan"
            role="Head of Strategy & Intelligence"
            department="Strategic Operations"
            organization="Core SG"
            usageSummary="Active daily · 6 modules launched this week"
            icon={Shield}
          />

          <div className="glass-panel rounded-3xl border border-white/10 p-5 space-y-3">
            <SectionHeader title="Highlights" subtitle="Recent moves" />
            <ActivityList items={highlights} />
          </div>
        </div>

        <div className="space-y-3">
          <SectionHeader title="Usage Summary" subtitle="Signals from your activity" />
          <div className="grid gap-3 sm:grid-cols-2">
            <StatsCard label="Most visited" value="NM AI" trend="AI" icon={Cpu} />
            <StatsCard label="Trusted stack" value="RiskGuard" trend="Risk" icon={Shield} />
            <StatsCard label="Collaboration" value="SGCC" trend="Communication" icon={Building2} />
            <StatsCard label="Completion" value="98%" trend="Tasks cleared" icon={CheckCircle} />
          </div>
        </div>
      </div>
    </div>
  );
}
