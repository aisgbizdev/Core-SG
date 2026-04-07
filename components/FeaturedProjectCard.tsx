"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/project";
import { renderIcon } from "@/lib/icons";
import { categoryColors } from "@/lib/status";
import { StatusBadge } from "./StatusBadge";
import { FavoriteButton } from "./FavoriteButton";

interface FeaturedProjectCardProps {
  project: Project;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
  enableMotion?: boolean;
}

export function FeaturedProjectCard({
  project,
  onFavorite,
  isFavorite,
  enableMotion = true,
}: FeaturedProjectCardProps) {
  const isAcc = project.slug === "acc";
  const url = isAcc ? project.url : `/project/${project.slug}`;

  return (
    <motion.div
      whileHover={enableMotion ? { y: -8, scale: 1.01 } : undefined}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-cyan-500/10 p-6 shadow-xl shadow-cyan-500/20 min-w-[300px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.2),transparent_35%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-3xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-50 shadow-lg shadow-cyan-500/30">
            {renderIcon(project.icon, "h-7 w-7")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-100">Featured</p>
              <StatusBadge status={project.status} />
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-white flex items-center gap-2">
              {project.name}
              <span className={categoryColors[project.category]}>{project.category}</span>
            </h3>
            <p className="mt-1 text-sm text-muted max-w-xl">{project.description}</p>
            <p className="mt-2 text-sm text-muted">Owner · {project.owner}</p>
            <div className="mt-4 flex items-center gap-3">
              {isAcc ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-cyan-300/60 hover:bg-cyan-500/15 transition"
                >
                  Launch
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href={url}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-cyan-300/60 hover:bg-cyan-500/15 transition"
                >
                  Launch
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <FavoriteButton active={isFavorite} onToggle={() => onFavorite(project.id)} />
      </div>
    </motion.div>
  );
}
