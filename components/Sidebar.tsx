import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Grid,
  Star,
  Activity,
  Settings,
  UserRound,
  Home,
  ExternalLink,
  Factory,
  ChevronDown,
  Bot,
  Building2,
} from "lucide-react";
import { projects } from "@/data/projects";
import { chatgptLinks } from "@/data/chatgpts";
import { fivePtLinks } from "@/data/fivePt";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Grid },
  { href: "/project/sgcc", label: "Operasional", icon: Factory },
  { href: "/chatgpts", label: "ChatGPTS", icon: Bot },
  { href: "/five-pt", label: "5 PT", icon: Building2 },
  { href: "/favorites", label: "Favorites", icon: Star },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings },
];

const operationalSlugs = ["sgcc", "occ"];
const projectNavItems = projects
  .filter((p) => !operationalSlugs.includes(p.slug))
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));
const operationalNavItems = projects
  .filter((p) => operationalSlugs.includes(p.slug))
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

export function Sidebar() {
  const pathname = usePathname();
  const isProjectsActive = pathname === "/projects" || pathname.startsWith("/project/");
  const isOperationalActive = operationalNavItems.some(
    (p) => pathname === `/project/${p.slug}`
  );
  const isChatgptActive = pathname === "/chatgpts" || pathname.startsWith("/chatgpts/");
  const isFivePtActive = pathname === "/five-pt" || pathname.startsWith("/five-pt/");
  const [chatgptOpen, setChatgptOpen] = useState(isChatgptActive);
  const [fivePtOpen, setFivePtOpen] = useState(isFivePtActive);
  const [projectsOpen, setProjectsOpen] = useState(isProjectsActive);
  const [operationalOpen, setOperationalOpen] = useState(isOperationalActive);

  return (
    <aside className="glass-panel w-full sm:w-64 lg:w-72 rounded-3xl p-6 space-y-8 shadow-2xl border border-white/10 min-h-[80vh] lg:min-h-[calc(100vh-48px)] backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <Image
          src="/logo-core.svg"
          alt="Core SG logo"
          width={48}
          height={48}
          className="rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,200,255,0.8)] ring-1 ring-white/20 border border-white/10"
          priority
        />
        <div>
          <p className="text-sm text-muted">Core SG</p>
          <p className="text-lg font-semibold text-white">Command Portal</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          if (item.label === "Projects") {
            return (
              <div key={item.href} className="space-y-2">
                <button
                  onClick={() => setProjectsOpen((v) => !v)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                    "border border-transparent hover:border-white/10",
                    "hover:bg-white/5",
                    projectsOpen
                      ? "bg-white/10 text-white border-white/15 shadow-lg shadow-cyan-500/20"
                      : "text-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      projectsOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>

                {projectsOpen && (
                  <div className="ml-2 pl-4 space-y-1">
                    <Link
                      href="/projects"
                      className={cn(
                        "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                        "hover:border-white/10 hover:bg-white/5",
                        pathname === "/projects" &&
                          "border-white/15 bg-white/10 text-white shadow-cyan-500/10"
                      )}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="truncate">All Projects</span>
                    </Link>
                    {projectNavItems.map((p) => {
                      const subActive = pathname === `/project/${p.slug}`;
                      return (
                        <Link
                          key={p.id}
                          href={`/project/${p.slug}`}
                          className={cn(
                            "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                            "hover:border-white/10 hover:bg-white/5",
                            subActive &&
                              "border-white/15 bg-white/10 text-white shadow-cyan-500/10"
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
          }

          if (item.label === "Operasional") {
            return (
              <div key={item.href} className="space-y-2">
                <button
                  onClick={() => setOperationalOpen((v) => !v)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                    "border border-transparent hover:border-white/10",
                    "hover:bg-white/5",
                    operationalOpen
                      ? "bg-white/10 text-white border-white/15 shadow-lg shadow-cyan-500/20"
                      : "text-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      operationalOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>

                {operationalOpen && (
                  <div className="ml-2 pl-4 space-y-1">
                    {operationalNavItems.map((p) => {
                      const subActive = pathname === `/project/${p.slug}`;
                      const isSgcc = p.slug === "sgcc";
                      if (isSgcc) {
                        return (
                          <a
                            key={p.id}
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                              "hover:border-white/10 hover:bg-white/5",
                              subActive &&
                                "border-white/15 bg-white/10 text-white shadow-cyan-500/10"
                            )}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="truncate">{p.name}</span>
                          </a>
                        );
                      }
                      return (
                        <Link
                          key={p.id}
                          href={`/project/${p.slug}`}
                          className={cn(
                            "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                            "hover:border-white/10 hover:bg-white/5",
                            subActive &&
                              "border-white/15 bg-white/10 text-white shadow-cyan-500/10"
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
          }

          if (item.label === "ChatGPTS") {
            return (
              <div key={item.href} className="space-y-2">
                <button
                  onClick={() => setChatgptOpen((v) => !v)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                    "border border-transparent hover:border-white/10",
                    "hover:bg-white/5",
                    chatgptOpen
                      ? "bg-white/10 text-white border-white/15 shadow-lg shadow-cyan-500/20"
                      : "text-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      chatgptOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>

                {chatgptOpen && (
                  <div className="ml-2 pl-4 space-y-1">
                    <Link
                      href="/chatgpts"
                      className={cn(
                        "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                        "hover:border-white/10 hover:bg-white/5",
                        pathname === "/chatgpts" &&
                          "border-white/15 bg-white/10 text-white shadow-cyan-500/10"
                      )}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="truncate">All ChatGPTS</span>
                    </Link>
                    {chatgptLinks.map((c) => {
                      return (
                        <a
                          key={c.slug}
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                            "hover:border-white/10 hover:bg-white/5 text-muted"
                          )}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="truncate">{c.name}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          if (item.label === "5 PT") {
            return (
              <div key={item.href} className="space-y-2">
                <button
                  onClick={() => setFivePtOpen((v) => !v)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                    "border border-transparent hover:border-white/10",
                    "hover:bg-white/5",
                    fivePtOpen
                      ? "bg-white/10 text-white border-white/15 shadow-lg shadow-cyan-500/20"
                      : "text-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      fivePtOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>

                {fivePtOpen && (
                  <div className="ml-2 pl-4 space-y-1">
                    <Link
                      href="/five-pt"
                      className={cn(
                        "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                        "hover:border-white/10 hover:bg-white/5",
                        pathname === "/five-pt" &&
                          "border-white/15 bg-white/10 text-white shadow-cyan-500/10"
                      )}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="truncate">All 5 PT</span>
                    </Link>
                    {fivePtLinks.map((c) => {
                      const subActive = pathname === `/five-pt/${c.slug}`;
                      return (
                        <Link
                          key={c.slug}
                          href={`/five-pt/${c.slug}`}
                          className={cn(
                            "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                            "hover:border-white/10 hover:bg-white/5",
                            subActive &&
                              "border-white/15 bg-white/10 text-white shadow-cyan-500/10"
                          )}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="truncate">{c.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

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
