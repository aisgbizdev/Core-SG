"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { ThemeClient } from "@/components/ThemeClient";
import { cn } from "@/lib/utils";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-4 min-h-screen">
      <ThemeClient />

      <div className="lg:flex lg:gap-6 lg:items-start lg:min-h-[90vh]">
        {/* Desktop sidebar */}
        <div className="hidden lg:block lg:sticky lg:top-4 lg:self-start">
          <Sidebar />
        </div>

        {/* Main area */}
        <div className="flex-1 w-full max-w-6xl mx-auto pb-12 space-y-6">
          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center justify-between">
            <button
              aria-label="Open navigation"
              onClick={() => setOpen(true)}
              className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 text-white flex items-center justify-center shadow-md shadow-black/30"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {children}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300 lg:hidden",
          open ? "bg-black/60 opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[82vw] max-w-xs overflow-y-auto p-4 transition-transform duration-300 lg:hidden",
          "bg-[#0b1220]/85 backdrop-blur-2xl",
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
