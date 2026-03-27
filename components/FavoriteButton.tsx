"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  active: boolean;
  onToggle: () => void;
}

export function FavoriteButton({ active, onToggle }: FavoriteButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "h-10 w-10 rounded-full border flex items-center justify-center transition-all",
        active
          ? "bg-amber-500/20 border-amber-400/60 text-amber-200 shadow-lg shadow-amber-500/25"
          : "bg-white/5 border-white/10 text-muted hover:border-amber-300/40 hover:text-amber-100"
      )}
    >
      <Star className={cn("h-5 w-5", active && "fill-amber-300")} />
    </motion.button>
  );
}
