"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity as ActivityIcon,
  ArrowUpRight,
  Compass,
  Flame,
  Heart,
  LucideIcon,
  Rocket,
  ShieldHalf,
  Sparkles,
  TrendingUp,
  Wand2,
} from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { SearchInput } from "@/components/SearchInput";
import { FeaturedProjectCard } from "@/components/FeaturedProjectCard";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ActivityList } from "@/components/ActivityList";
import { StatsCard } from "@/components/StatsCard";
import { projects } from "@/data/projects";
import { useFavorites } from "@/hooks/useFavorites";
import { usePreferences } from "@/hooks/usePreferences";

const mockActivity = [
  { title: "Opened NM AI", time: "2 mins ago", tag: "Launch" },
  { title: "Visited RiskGuard", time: "18 mins ago", tag: "Risk" },
  { title: "Added BIAS to favorites", time: "Yesterday", tag: "Favorite" },
  { title: "Reviewed AiSG dashboard", time: "2 days ago", tag: "Audit" },
];

const chatgptLinks = [
  {
    name: "aisg",
    url: "https://chatgpt.com/g/g-68f60e2ded048191816ee3e67eea952f-aisg-audit-intelligence-system-growth",
  },
  {
    name: "bias",
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
    name: "sgcc",
    url: "https://chatgpt.com/g/g-693fa1b8cc388191b1ceffe68d41b514-sg-control-center",
  },
  {
    name: "SG Solid",
    url: "https://chatgpt.com/g/g-690354fea4448191a1239464b9a2a31e-see-the-world-brighter",
  },
].sort((a, b) => a.name.localeCompare(b.name));

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { preferences } = usePreferences();
  const { favorites, toggleFavorite, isFavorite, hydrated } = useFavorites(projects);

  const featured = useMemo(() => projects.filter((p) => p.featured), []);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const totalActive = projects.filter((p) => p.status === "Active").length;
  const analyticsCount = projects.filter((p) => p.category === "Analytics").length;

  return (
    <div className="space-y-6">
      <Topbar
        title="Core SG"
        subtitle="One Access, All Solutions"
        className="sticky top-4 z-20"
      >
        <Link
          href="/projects"
          className="hidden md:inline-flex rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/20"
        >
          View All
        </Link>
      </Topbar>

      <section className="glass-panel overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl">
        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan-200">
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-[11px] font-semibold">Executive Portal</span>
              <span>Premium Access Layer</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-tight text-glow">
                Core SG
              </h1>
              <p className="text-xl text-muted">One Access, All Solutions.</p>
              <p className="text-sm sm:text-base text-muted max-w-2xl">
                A focused command center that links every strategic platform with a single, elegant entry point. No friction, no clutter—just decisive access.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 bg-cyan-500/15 px-5 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition"
              >
                <Rocket className="h-5 w-5" />
                Browse Projects
              </Link>
              <Link
                href="/favorites"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-amber-300/40 hover:text-amber-100"
              >
                <Heart className="h-5 w-5" />
                Favorites ({hydrated ? favorites.length : "-"})
              </Link>
              <Link
                href="/activity"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-cyan-300/40"
              >
                <ActivityIcon className="h-5 w-5" />
                Recent Activity
              </Link>
              <Link
                href="/chatgpts"
                className="inline-flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-300/10 px-5 py-3 text-sm font-semibold text-amber-50 hover:bg-amber-300/20"
              >
                <Wand2 className="h-5 w-5" />
                Open ChatGPTS
              </Link>
            </div>
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search project instantly"
              className="max-w-xl"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <StatsCard label="Total Projects" value={projects.length.toString()} trend="100% available" icon={Compass} />
            <StatsCard label="Active" value={`${totalActive}`} trend="Fully operational" icon={ShieldHalf} accent="text-emerald-200" />
            <StatsCard label="Analytics Stack" value={`${analyticsCount}`} trend="BI + Visualization" icon={TrendingUp} accent="text-cyan-200" />
            <StatsCard label="Favorites" value={hydrated ? favorites.length.toString() : "—"} trend="Personal picks" icon={Heart} accent="text-amber-200" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="ChatGPTS"
          subtitle="Jump straight into the guided GPT experiences"
          actions={
            <Link
              href="/chatgpts"
              className="text-sm font-semibold text-cyan-100 hover:text-white"
            >
              View in sidebar
            </Link>
          }
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chatgptLinks.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="glass-panel rounded-3xl border border-white/10 px-4 py-3 flex items-center justify-between hover:border-cyan-300/40 hover:bg-white/5 transition-colors"
            >
              <div>
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-xs text-muted">Opens in new tab</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-cyan-100" />
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Featured" subtitle="Flagship modules for rapid access" />
        <div className="grid gap-4 lg:grid-cols-2">
          {featured.map((project) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              onFavorite={toggleFavorite}
              isFavorite={isFavorite(project.id)}
              enableMotion={preferences.animations}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="All Projects"
          subtitle="Launch any platform instantly"
          actions={
            <Link
              href="/projects"
              className="text-sm font-semibold text-cyan-100 hover:text-white"
            >
              See all
            </Link>
          }
        />
        <div className="card-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onFavorite={toggleFavorite}
              isFavorite={isFavorite(project.id)}
              compact={preferences.compactMode}
              enableMotion={preferences.animations}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4 lg:grid lg:grid-cols-[1fr,0.9fr] lg:items-start lg:gap-6">
        <div className="space-y-3">
          <SectionHeader title="Recent Activity" subtitle="Signals across your workspace" />
          <div className="glass-panel rounded-3xl border border-white/10 p-5">
            <ActivityList items={mockActivity} />
          </div>
        </div>
        <div className="space-y-3">
          <SectionHeader title="Experience" subtitle="Curated for executives" />
          <div className="grid gap-3 sm:grid-cols-2">
            <ExperienceTile
              icon={Sparkles}
              title="Glassmorphic depth"
              description="Soft gradients, precise spacing, premium tactility across every surface."
            />
            <ExperienceTile
              icon={Flame}
              title="Motion tuned"
              description="Entrance and hover animations guided by subtle physics."
            />
            <ExperienceTile
              icon={Wand2}
              title="Consistent modules"
              description="Reusable cards, badges, and filters to expand effortlessly."
            />
            <ExperienceTile
              icon={ActivityIcon}
              title="Signal-first"
              description="Activity and stats stay visible without overwhelming the canvas."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ExperienceTile({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-panel rounded-3xl border border-white/10 p-4"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-100">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{title}</p>
          <p className="text-xs text-muted">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
