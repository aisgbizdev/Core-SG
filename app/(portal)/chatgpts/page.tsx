"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { SectionHeader } from "@/components/SectionHeader";

const chatgptLinks = [
  {
    name: "aisg",
    url: "https://chatgpt.com/g/g-68f60e2ded048191816ee3e67eea952f-aisg-audit-intelligence-system-growth",
  },
  {
    name: "bias",
    url: "https://chatgpt.com/g/g-68f512b32ef88191985d7e15f828ae7d-adaptive-behavioral-ai-for-creators-marketers",
  },
  {
    name: "Darvis",
    url: "https://chatgpt.com/g/g-698fece36da481919d91ecde826444f1-darvis",
  },
  {
    name: "Editorial Engine",
    url: "https://chatgpt.com/g/g-69a661c1e9608191aa03b732251d6d1a-editorial-engine",
  },
  {
    name: "NM Ai",
    url: "https://chatgpt.com/g/g-68f5045d612881919fe0b62f2963fdc6-nm23-ai-market-intelligence",
  },
  {
    name: "sgcc",
    url: "https://chatgpt.com/g/g-693fa1b8cc388191b1ceffe68d41b514-sg-control-center",
  },
  {
    name: "SG Solid",
    url: "https://chatgpt.com/g/g-690354fea4448191a1239464b9a2a31e-see-the-world-brighter",
  },
].sort((a, b) => a.name.localeCompare(b.name));

export default function ChatgptsPage() {
  return (
    <div className="space-y-6">
      <Topbar title="ChatGPTS" subtitle="Guided GPT experiences for SG workflows" />

      <SectionHeader
        title="Collections"
        subtitle="Each opens a tailored GPT in a new tab"
        actions={
          <Link href="/" className="text-sm font-semibold text-cyan-100 hover:text-white">
            Back to Home
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {chatgptLinks.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="glass-panel rounded-3xl border border-white/10 px-4 py-3 flex items-center justify-between hover:border-cyan-300/40 hover:bg-white/5 transition-colors"
          >
            <div>
              <p className="text-white font-semibold">{item.name}</p>
              <p className="text-xs text-muted">Open in ChatGPT</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-cyan-100" />
          </a>
        ))}
      </div>
    </div>
  );
}
