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
} from "lucide-react";
import { projects } from "@/data/projects";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Grid },
  { href: "/project/sgcc", label: "Operasional", icon: Factory },
  { href: "/chatgpts", label: "ChatGPTS", icon: Bot },
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

const chatgptItems = [
  {
    name: "AiSG",
    url: "https://chatgpt.com/g/g-68f60e2ded048191816ee3e67eea952f-aisg-audit-intelligence-system-growth",
  },
  {
    name: "BIAS",
    url: "https://chatgpt.com/g/g-68f512b32ef88191985d7e15f828ae7d-adaptive-behavioral-ai-for-creators-marketers",
  },
  {
    name: "Darvis",
    url: "https://chatgpt.com/g/g-698fece36da481919d91ecde826444f1-darvis",
  },
  {
    name: "Editorial Engine",
    url: "https://chatgpt.com/g/g-69a661c1e9608191aa03b732251d6d1a-editorial-engine",
  },
  {
    name: "NM Ai",
    url: "https://chatgpt.com/g/g-68f5045d612881919fe0b62f2963fdc6-nm23-ai-market-intelligence",
  },
  {
    name: "SGCC",
    url: "https://chatgpt.com/g/g-693fa1b8cc388191b1ceffe68d41b514-sg-control-center",
  },
  {
    name: "SG Solid",
    url: "https://chatgpt.com/g/g-690354fea4448191a1239464b9a2a31e-see-the-world-brighter",
  },
].sort((a, b) => a.name.localeCompare(b.name));

export function Sidebar() {
  const pathname = usePathname();
  const isProjectsActive = pathname === "/projects" || pathname.startsWith("/project/");
  const isOperationalActive = operationalNavItems.some(
    (p) => pathname === `/project/${p.slug}`
  );
  const isChatgptActive = pathname === "/chatgpts";
  const [chatgptOpen, setChatgptOpen] = useState(isChatgptActive);
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
                    {chatgptItems.map((c) => (
                      <a
                        key={c.url}
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
                    ))}
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
