"use client";

import { useMemo, useState } from "react";
import { Topbar } from "@/components/Topbar";
import { FilterBar } from "@/components/FilterBar";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { EmptyState } from "@/components/EmptyState";
import { projects } from "@/data/projects";
import { useFavorites } from "@/hooks/useFavorites";
import { usePreferences } from "@/hooks/usePreferences";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const { preferences, updatePreference } = usePreferences();
  const { toggleFavorite, isFavorite } = useFavorites(projects);

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const matchesSearch =
          project.name.toLowerCase().includes(search.toLowerCase()) ||
          project.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "all" || project.category === category;
        const matchesStatus = status === "all" || project.status === status;
        return matchesSearch && matchesCategory && matchesStatus;
      }),
    [search, category, status]
  );

  return (
    <div className="space-y-6">
      <Topbar title="Projects" subtitle="Every platform, one launchpad" />

      <FilterBar
        search={search}
        onSearch={setSearch}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        layout={preferences.layout}
        onLayoutChange={(value) => updatePreference("layout", value)}
      />

      <SectionHeader
        title="Modules"
        subtitle={`${filtered.length} of ${projects.length} available projects`}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No projects match"
          description="Try adjusting filters or search keywords."
        />
      ) : preferences.layout === "grid" ? (
        <div className="card-grid">
          {filtered.map((project) => (
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
      ) : (
        <div className="space-y-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onFavorite={toggleFavorite}
              isFavorite={isFavorite(project.id)}
              compact
              enableMotion={preferences.animations}
            />
          ))}
        </div>
      )}
    </div>
  );
}
