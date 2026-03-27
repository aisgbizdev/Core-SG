"use client";

import { useEffect } from "react";
import { usePreferences } from "@/hooks/usePreferences";

export function ThemeClient() {
  const { preferences, hydrated } = usePreferences();

  useEffect(() => {
    const theme = preferences.theme ?? "dark";
    const compact = preferences.compactMode ? "1" : "0";
    const animations = preferences.animations ? "1" : "0";
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.compact = compact;
    document.documentElement.dataset.animations = animations;
  }, [preferences.theme, preferences.compactMode, preferences.animations, hydrated]);

  return null;
}
