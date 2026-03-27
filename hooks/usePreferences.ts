"use client";

import { useLocalStorage } from "./useLocalStorage";

export type Preferences = {
  compactMode: boolean;
  animations: boolean;
  notifications: boolean;
  layout: "grid" | "list";
  theme: "dark" | "light";
};

const DEFAULT_PREFERENCES: Preferences = {
  compactMode: false,
  animations: true,
  notifications: true,
  layout: "grid",
  theme: "dark",
};

export function usePreferences() {
  const [preferences, setPreferences, hydrated] = useLocalStorage<Preferences>(
    "core-sg:preferences",
    DEFAULT_PREFERENCES
  );

  const updatePreference = <K extends keyof Preferences>(
    key: K,
    value: Preferences[K]
  ) => setPreferences((prev) => ({ ...prev, [key]: value }));

  return { preferences, updatePreference, hydrated };
}
