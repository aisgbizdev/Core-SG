import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
import {
  Star,
  Activity,
  Settings,
  Home,
  ExternalLink,
  Factory,
  ChevronDown,
  Bot,
  Cpu,
  Building2,
  Share2,
  GraduationCap,
} from "lucide-react";
import { projects } from "@/data/projects";
import { chatgptLinks } from "@/data/chatgpts";
import { fivePtLinks } from "@/data/fivePt";

type SosmedAccount = string | { label: string; path: string };
type SosmedGroup = { platform: string; baseUrl: string; accounts: SosmedAccount[] };

function isSosmedAccountObject(account: SosmedAccount): account is Exclude<SosmedAccount, string> {
  return typeof account === "object" && account !== null;
}

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Ai Product", icon: Cpu },
  { href: "/project/ebook", label: "Edu Product", icon: GraduationCap },
  { href: "/project/sgcc", label: "Operasional", icon: Factory },
  { href: "/chatgpts", label: "ChatGPTS", icon: Bot },
  { href: "/five-pt", label: "Portal PT", icon: Building2 },
  { href: "/sosmed", label: "Sosmed", icon: Share2 },
  { href: "/favorites", label: "Favorites", icon: Star },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings },
];

const operationalSlugs = ["sgcc", "occ", "acc"];
const ssccUrl = "https://ed27-115-85-69-214.ngrok-free.app/";
const eduProductSlugs = ["ebook", "edukasi", "newsmaker", "riskguard"];
const aiProductNavItems = projects
  .filter((p) => !operationalSlugs.includes(p.slug) && !eduProductSlugs.includes(p.slug))
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));
const eduProductNavItems = projects
  .filter((p) => eduProductSlugs.includes(p.slug))
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));
const operationalNavItems = projects
  .filter((p) => operationalSlugs.includes(p.slug))
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

const sosmedGroups: SosmedGroup[] = [
  {
    platform: "TikTok",
    baseUrl: "https://www.tiktok.com/",
    accounts: [
      "@newsmaker23_talk",
      "@newsmaker23",
      "@solidgold_news",
      "@sgb.digital",
      "@bias23_pro",
    ],
  },
  {
    platform: "Instagram",
    baseUrl: "https://www.instagram.com/",
    accounts: ["news.maker23", "sginsight_"],
  },
  {
    platform: "YouTube",
    baseUrl: "https://www.youtube.com/",
    accounts: [{ label: "Newsmaker 23", path: "channel/UCivhDV9fDdAwFgj2ct1x6DQ" }],
  },
  {
    platform: "Facebook",
    baseUrl: "https://www.facebook.com/",
    accounts: ["Solidgoldnews"],
  },
];

// Minimal brand glyphs (monochrome, 24x24, currentColor)
const TikTokIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M16.6 6.3c-.9-.6-1.6-1.4-1.9-2.3h-2.1v10.4c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2 1-2.2 2.2-2.2c.23 0 .46.04.68.1V9.9c-.23-.03-.46-.05-.68-.05-2.32 0-4.2 1.88-4.2 4.2 0 2.3 1.88 4.2 4.2 4.2s4.2-1.9 4.2-4.2V8.5c.63.45 1.34.78 2.11.95V7.1c-.66-.17-1.28-.48-1.99-.8z"
    />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="4" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
  </svg>
);

const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M21 9.5c0-1.5-.3-2.3-.7-2.8-.5-.6-1.1-.8-2.2-.9C16.9 5.6 14 5.6 12 5.6s-4.9 0-6.1.2c-1.1.1-1.7.3-2.2.9C3.3 7.2 3 8 3 9.5S3 12.9 3 14.4c0 1.5.3 2.3.7 2.8.5.6 1.1.8 2.2.9 1.2.2 4.1.2 6.1.2s4.9 0 6.1-.2c1.1-.1 1.7-.3 2.2-.9.4-.5.7-1.3.7-2.8.1-1.5.1-3 .1-4.5zM10.4 9.1l4.3 2.4-4.3 2.4V9.1z"
    />
  </svg>
);

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M13.4 9.2V7.6c0-.7.2-1.1 1.2-1.1h1.2V4H13c-2.6 0-3.6 1.3-3.6 3.6v1.6H7.5V12h1.9v8h4v-8h2.1l.3-2.8h-2.4z"
    />
  </svg>
);

const sosmedIconMap = {
  TikTok: TikTokIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  Facebook: FacebookIcon,
} as const;

export function Sidebar() {
  const pathname = usePathname();
  const isAiProductActive =
    pathname === "/projects" ||
    aiProductNavItems.some((p) => pathname === `/project/${p.slug}`);
  const isEduProductActive = eduProductNavItems.some(
    (p) => pathname === `/project/${p.slug}`
  );
  const isOperationalActive = operationalNavItems.some(
    (p) => pathname === `/project/${p.slug}`
  );
  const isChatgptActive = pathname === "/chatgpts" || pathname.startsWith("/chatgpts/");
  const isFivePtActive = pathname === "/five-pt" || pathname.startsWith("/five-pt/");
  const [chatgptOpen, setChatgptOpen] = useState(isChatgptActive);
  const [fivePtOpen, setFivePtOpen] = useState(isFivePtActive);
  const [sosmedOpen, setSosmedOpen] = useState(false);
  const [sosmedPlatformOpen, setSosmedPlatformOpen] = useState<Record<string, boolean>>({});
  const [aiProductOpen, setAiProductOpen] = useState(isAiProductActive);
  const [eduProductOpen, setEduProductOpen] = useState(isEduProductActive);
  const [operationalOpen, setOperationalOpen] = useState(isOperationalActive);

  return (
    <aside className="glass-panel flex w-full min-h-[80vh] flex-col rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-2xl sm:w-64 lg:h-[calc(100vh-32px)] lg:min-h-[calc(100vh-32px)] lg:w-72 lg:overflow-hidden">
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

      <nav className="mt-8 flex-1 space-y-2 overflow-y-auto pr-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          if (item.label === "Ai Product") {
            return (
              <div key={item.href} className="space-y-2">
                <button
                  onClick={() => setAiProductOpen((v) => !v)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                    "border border-transparent hover:border-white/10",
                    "hover:bg-white/5",
                    aiProductOpen
                      ? "bg-white/10 text-white border-white/15 shadow-lg shadow-cyan-500/20"
                      : "text-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      aiProductOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>

                {aiProductOpen && (
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
                      <span className="truncate">All Ai Product</span>
                    </Link>
                    {aiProductNavItems.map((p) => {
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

          if (item.label === "Edu Product") {
            return (
              <div key={item.href} className="space-y-2">
                <button
                  onClick={() => setEduProductOpen((v) => !v)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                    "border border-transparent hover:border-white/10",
                    "hover:bg-white/5",
                    eduProductOpen
                      ? "bg-white/10 text-white border-white/15 shadow-lg shadow-cyan-500/20"
                      : "text-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      eduProductOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>

                {eduProductOpen && (
                  <div className="ml-2 pl-4 space-y-1">
                    {eduProductNavItems.map((p) => {
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
                      const isAcc = p.slug === "acc";
                      const subActive = !isAcc && pathname === `/project/${p.slug}`;
                      const itemClassName = cn(
                        "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                        "hover:border-white/10 hover:bg-white/5",
                        subActive &&
                          "border-white/15 bg-white/10 text-white shadow-cyan-500/10"
                      );

                      if (isAcc) {
                        return (
                          <a
                            key={p.id}
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            className={itemClassName}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="truncate">{p.name}</span>
                          </a>
                        );
                      }

                      return (
                        <Link key={p.id} href={`/project/${p.slug}`} className={itemClassName}>
                          <ExternalLink className="h-4 w-4" />
                          <span className="truncate">{p.name}</span>
                        </Link>
                      );
                    })}
                    <a
                      href={ssccUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                        "hover:border-white/10 hover:bg-white/5 text-muted"
                      )}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="truncate">SSCC</span>
                    </a>
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

          if (item.href === "/five-pt") {
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
                      <span className="truncate">All Portal PT</span>
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

          if (item.label === "Sosmed") {
            return (
              <div key={item.href} className="space-y-2">
                <button
                  onClick={() => setSosmedOpen((v) => !v)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                    "border border-transparent hover:border-white/10",
                    "hover:bg-white/5",
                    sosmedOpen
                      ? "bg-white/10 text-white border-white/15 shadow-lg shadow-cyan-500/20"
                      : "text-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      sosmedOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>

                {sosmedOpen && (
                  <div className="ml-2 pl-4 space-y-1">
                    {sosmedGroups.map((group) => (
                      <div key={group.platform} className="space-y-1">
                        <button
                          onClick={() =>
                            setSosmedPlatformOpen((prev) => ({
                              ...prev,
                              [group.platform]: !prev[group.platform],
                            }))
                          }
                          className={cn(
                            "w-full flex items-center gap-2 rounded-2xl px-3 py-2 text-sm border border-transparent",
                            "hover:border-white/10 hover:bg-white/5",
                            sosmedPlatformOpen[group.platform] &&
                              "border-white/15 bg-white/10 text-white shadow-cyan-500/10"
                          )}
                        >
                          {(
                            sosmedIconMap[group.platform as keyof typeof sosmedIconMap] ??
                            ExternalLink
                          )({ className: "h-4 w-4" })}
                          <span className="truncate flex-1 text-left">{group.platform}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              sosmedPlatformOpen[group.platform] ? "rotate-180" : "rotate-0"
                            )}
                          />
                        </button>

                        {sosmedPlatformOpen[group.platform] && (
                          <>
                            {group.accounts.length > 0 ? (
                              group.accounts.map((account) => {
                                const label = isSosmedAccountObject(account) ? account.label : account;
                                const handle = isSosmedAccountObject(account)
                                  ? account.path
                                  : account.startsWith("@")
                                  ? account.slice(1)
                                  : account;
                                const href =
                                  group.platform === "TikTok"
                                    ? `${group.baseUrl}@${handle}`
                                    : `${group.baseUrl}${handle}`;
                                return (
                                  <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                      "flex items-center gap-2 rounded-2xl px-5 py-2 text-sm border border-transparent",
                                      "hover:border-white/10 hover:bg-white/5 text-muted"
                                    )}
                                  >
                                    <span className="truncate">{label}</span>
                                  </a>
                                );
                              })
                            ) : (
                              <div className="px-5 py-2 text-sm text-muted italic">
                                Belum ada akun terdaftar
                              </div>
                            )}
                          </>
                        )}
                      </div>
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

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 to-blue-600/10 p-4 shadow-lg shadow-cyan-500/25">
        <p className="text-sm text-cyan-100 font-semibold">One Access</p>
        <p className="text-lg font-semibold text-white">All Solutions</p>
        <p className="text-sm text-muted mt-2">
          Seamless entry to every strategic platform. Designed for speed and clarity.
        </p>
      </div>
    </aside>
  );
}
