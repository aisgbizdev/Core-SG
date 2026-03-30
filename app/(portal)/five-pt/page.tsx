"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { SectionHeader } from "@/components/SectionHeader";
import { fivePtLinks } from "@/data/fivePt";

export default function FivePtPage() {
  return (
    <div className="space-y-6">
      <Topbar title="5 PT" subtitle="PT network webviews" />

      <SectionHeader
        title="Institutions"
        subtitle="Open each brokerage portal in an embedded view"
        actions={
          <Link href="/" className="text-sm font-semibold text-cyan-100 hover:text-white">
            Back to Home
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fivePtLinks.map((item) => (
          <Link
            key={item.slug}
            href={`/five-pt/${item.slug}`}
            className="glass-panel rounded-3xl border border-white/10 px-4 py-3 flex items-center justify-between hover:border-cyan-300/40 hover:bg-white/5 transition-colors"
          >
            <div>
              <p className="text-white font-semibold">{item.name}</p>
              <p className="text-xs text-muted">Open webview</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-cyan-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}
