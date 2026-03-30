"use client";

import { use } from "react";
import { ArrowUpRight } from "lucide-react";
import { chatgptLinks } from "@/data/chatgpts";
import { Topbar } from "@/components/Topbar";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ChatgptWebviewPage({ params }: Props) {
  const { slug } = use(params);
  const item = chatgptLinks.find((c) => c.slug === slug);
  if (!item) {
    return (
      <div className="space-y-4">
        <Topbar title="Not found" subtitle="ChatGPT link unavailable" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: "ChatGPTS", href: "/chatgpts" },
          { label: item.name },
        ]}
      />
      <Topbar title={item.name} subtitle="ChatGPT webview" />
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 text-sm text-muted bg-white/5">
          <span className="truncate">{item.url}</span>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-cyan-200 font-semibold hover:text-white"
          >
            Open tab <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <iframe
          src={item.url}
          title={item.name}
          className="w-full min-h-[70vh] lg:min-h-[80vh] bg-black/60"
          allow="fullscreen; clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}
