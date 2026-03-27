"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Project } from "@/types/project";
import { renderIcon } from "@/lib/icons";
import { categoryColors } from "@/lib/status";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { FavoriteButton } from "./FavoriteButton";

interface ProjectCardProps {
  project: Project;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
  compact?: boolean;
  enableMotion?: boolean;
}

export function ProjectCard({
  project,
  onFavorite,
  isFavorite,
  compact,
  enableMotion = true,
}: ProjectCardProps) {
  const url = `/project/${project.slug}`;

  return (
    <motion.div
      layout
      whileHover={enableMotion ? { y: -6, scale: 1.01 } : undefined}
      transition={enableMotion ? { type: "spring", stiffness: 300, damping: 24 } : { duration: 0 }}
      className={cn(
        "glass-panel rounded-3xl border border-white/10 p-5 space-y-4 min-w-[280px]",
        "shadow-lg shadow-black/30 hover:shadow-cyan-500/20",
        compact && "p-4"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-200">
            {renderIcon(project.icon, "h-6 w-6")}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Link href={url} className="hover:text-cyan-100 transition-colors">
                {project.name}
              </Link>
              <span className={cn("text-xs font-medium", categoryColors[project.category])}>
                {project.category}
              </span>
            </h3>
            <p className="text-sm text-muted">{project.description}</p>
          </div>
        </div>
        <FavoriteButton active={isFavorite} onToggle={() => onFavorite(project.id)} />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-sm text-muted">
          <StatusBadge status={project.status} />
          <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <p className="truncate">{project.owner}</p>
        </div>
        <Link
          href={url}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/20 transition-colors w-full"
        >
          Open
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
