import { ProjectCategory, ProjectStatus } from "@/types/project";

export const statusStyles: Record<ProjectStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30",
  Beta: "bg-amber-500/15 text-amber-200 border border-amber-500/30",
  Restricted: "bg-rose-500/15 text-rose-200 border border-rose-500/30",
  "Coming Soon": "bg-sky-500/15 text-sky-200 border border-sky-500/30",
};

export const categoryColors: Record<ProjectCategory, string> = {
  AI: "text-sky-200",
  Audit: "text-amber-200",
  Analytics: "text-cyan-200",
  Risk: "text-rose-200",
  Operations: "text-emerald-200",
  Communication: "text-indigo-200",
};

export const categories: ProjectCategory[] = [
  "AI",
  "Audit",
  "Analytics",
  "Risk",
  "Operations",
  "Communication",
];

export const statuses: ProjectStatus[] = [
  "Active",
  "Beta",
  "Restricted",
  "Coming Soon",
];
