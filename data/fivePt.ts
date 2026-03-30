export interface FivePtLink {
  name: string;
  slug: string;
  url: string;
}

export const fivePtLinks: FivePtLink[] = [
  { name: "BPF", slug: "bpf", url: "https://www.bestprofit-futures.co.id/" },
  { name: "EWF", slug: "ewf", url: "https://www.equityworld-futures.com/" },
  { name: "KPF", slug: "kpf", url: "https://www.kp-futures.com/" },
  { name: "RFB", slug: "rfb", url: "https://www.rf-berjangka.com/" },
  { name: "SGB", slug: "sgb", url: "https://www.sg-berjangka.com/" },
].sort((a, b) => a.name.localeCompare(b.name));
