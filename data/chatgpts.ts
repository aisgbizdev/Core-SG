export interface ChatgptLink {
  name: string;
  slug: string;
  url: string;
  description?: string;
}

export const chatgptLinks: ChatgptLink[] = [
  {
    name: "AiSG",
    slug: "aisg",
    url: "https://chatgpt.com/g/g-68f60e2ded048191816ee3e67eea952f-aisg-audit-intelligence-system-growth",
  },
  {
    name: "BIAS",
    slug: "bias",
    url: "https://chatgpt.com/g/g-69d0bb0116608191a22c82ac34823d73-bias",
  },
  {
    name: "Darvis",
    slug: "darvis",
    url: "https://chatgpt.com/g/g-698fece36da481919d91ecde826444f1-darvis",
  },
  {
    name: "Editorial Engine",
    slug: "editorial-engine",
    url: "https://chatgpt.com/g/g-69a661c1e9608191aa03b732251d6d1a-editorial-engine",
  },
  {
    name: "Prime Sales",
    slug: "flex-sales",
    url: "https://chatgpt.com/g/g-69cde65d2fa081919907393fcd892e6e-flex-sales",
  },
  {
    name: "NM Ai",
    slug: "nm-ai",
    url: "https://chatgpt.com/g/g-68f5045d612881919fe0b62f2963fdc6-nm23-ai-market-intelligence",
  },
  {
    name: "Reguler Sales",
    slug: "reguler-sales",
    url: "https://chatgpt.com/g/g-69cdfc23553081918d0fdec0f3332f18-regular-sales",
  },
  {
    name: "SGCC",
    slug: "sgcc",
    url: "https://chatgpt.com/g/g-693fa1b8cc388191b1ceffe68d41b514-sg-control-center",
  },
  {
    name: "SG Solid",
    slug: "sg-solid",
    url: "https://chatgpt.com/g/g-690354fea4448191a1239464b9a2a31e-see-the-world-brighter",
  },
].sort((a, b) => a.name.localeCompare(b.name));
