"use client";

import { Project } from "@/types/project";
import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "core-sg:favorites";

export function useFavorites(projects: Project[]) {
  const [favoriteIds, setFavoriteIds, hydrated] = useLocalStorage<string[]>(
    STORAGE_KEY,
    []
  );

  const favorites = useMemo(
    () => projects.filter((project) => favoriteIds.includes(project.id)),
    [favoriteIds, projects]
  );

  const toggleFavorite = (projectId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const isFavorite = (projectId: string) => favoriteIds.includes(projectId);

  return { favorites, toggleFavorite, isFavorite, hydrated };
}
