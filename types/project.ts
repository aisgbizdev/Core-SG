export type ProjectStatus = "Active" | "Beta" | "Restricted" | "Coming Soon";
export type ProjectCategory =
  | "AI"
  | "Audit"
  | "Analytics"
  | "Risk"
  | "Operations"
  | "Communication";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  category: ProjectCategory;
  icon: string;
  url: string;
  featured?: boolean;
  owner: string;
}
