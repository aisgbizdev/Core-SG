import { LucideIcon } from "lucide-react";

interface ProfileCardProps {
  name: string;
  role: string;
  department: string;
  organization: string;
  usageSummary: string;
  icon: LucideIcon;
}

export function ProfileCard({
  name,
  role,
  department,
  organization,
  usageSummary,
  icon: Icon,
}: ProfileCardProps) {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-100">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Profile</p>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-sm text-muted">{role}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm text-muted">
        <Info label="Department" value={department} />
        <Info label="Organization" value={organization} />
        <Info label="Usage" value={usageSummary} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2">
      <p className="text-[11px] uppercase tracking-wide text-muted/80">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}
