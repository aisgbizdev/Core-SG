"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { EmptyState } from "@/components/EmptyState";
import { projects } from "@/data/projects";
import { useFavorites } from "@/hooks/useFavorites";
import { usePreferences } from "@/hooks/usePreferences";

export default function FavoritesPage() {
  const { preferences } = usePreferences();
  const { favorites, toggleFavorite, isFavorite, hydrated } = useFavorites(projects);

  return (
    <div className="space-y-6">
      <Topbar title="Favorites" subtitle="Personal shortlist for faster launches" />

      <SectionHeader
        title="Pinned Modules"
        subtitle={hydrated ? `${favorites.length} saved` : "Loading preferences"}
        actions={
          <Link
            href="/projects"
            className="text-sm font-semibold text-cyan-100 hover:text-white"
          >
            Browse all
          </Link>
        }
      />

      {!hydrated ? (
        <div className="glass-panel rounded-3xl border border-white/10 p-6 text-sm text-muted">
          Loading your saved choices...
        </div>
      ) : favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Star the projects you use most to keep them one tap away."
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-white"
            >
              <Sparkles className="h-4 w-4" />
              Discover projects
            </Link>
          }
        />
      ) : (
        <div className="card-grid">
          {favorites.map((project) => (
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
      )}
    </div>
  );
}
