import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Grid,
  Star,
  Activity,
  Settings,
  UserRound,
  Home,
  ExternalLink,
} from "lucide-react";
import { projects } from "@/data/projects";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Grid },
  { href: "/favorites", label: "Favorites", icon: Star },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-panel w-full sm:w-64 lg:w-72 rounded-3xl p-6 space-y-8 shadow-2xl border border-white/10 min-h-[80vh] lg:min-h-[calc(100vh-48px)] backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <span className="text-xl font-semibold text-cyan-100">CS</span>
        </div>
        <div>
          <p className="text-sm text-muted">Core SG</p>
          <p className="text-lg font-semibold text-white">Command Portal</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <div key={item.href} className="space-y-2">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                  "border border-transparent hover:border-white/10",
                  "hover:bg-white/5",
                  active
                    ? "bg-white/10 text-white border-white/15 shadow-lg shadow-cyan-500/20"
                    : "text-muted"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>

              {item.label === "Projects" && (
                <div className="ml-2 pl-4 space-y-1">
                  {projects.map((p) => {
                    const subActive = pathname === `/project/${p.slug}`;
                    return (
                      <Link
                        key={p.id}
                        href={`/project/${p.slug}`}
                        className={cn(
                          "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                          "hover:border-white/10 hover:bg-white/5",
                          subActive && "border-white/15 bg-white/10 text-white shadow-cyan-500/10"
                        )}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="truncate">{p.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 to-blue-600/10 p-4 shadow-lg shadow-cyan-500/25">
        <p className="text-sm text-cyan-100 font-semibold">One Access</p>
        <p className="text-lg font-semibold text-white">All Solutions</p>
        <p className="text-sm text-muted mt-2">
          Seamless entry to every strategic platform. Designed for speed and clarity.
        </p>
      </div>
    </aside>
  );
}
