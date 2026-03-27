"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ThemeClient } from "@/components/ThemeClient";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <ThemeClient />

      {/* Desktop layout */}
      <div className="hidden lg:flex lg:gap-6 lg:items-start lg:min-h-[90vh] px-4 py-6 sm:px-6 lg:px-8 space-y-4">
        <div className="lg:sticky lg:top-4 lg:self-start">
          <Sidebar />
        </div>
        <main className="flex-1 space-y-8 w-full max-w-6xl mx-auto pb-12">{children}</main>
      </div>

      {/* Mobile / tablet */}
      <div className="lg:hidden px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <button
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 text-white flex items-center justify-center shadow-md shadow-black/30"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <main className="space-y-8 pb-12 max-w-5xl mx-auto">{children}</main>
      </div>

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300",
          open ? "bg-black/60 opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[82vw] max-w-xs p-4 transition-transform duration-300",
          "bg-[#0b1220]/80 backdrop-blur-2xl",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-end mb-2">
          <button
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 text-white flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
