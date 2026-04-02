import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Topbar } from "@/components/Topbar";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectWebviewPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: "Projects", href: "/projects" }, { label: project.name }]} />
      <Topbar title={project.name} subtitle={project.description} />
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 text-sm text-muted bg-white/5">
          <span className="truncate">{project.url}</span>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-200 font-semibold hover:text-white"
          >
            Open in new tab
          </a>
        </div>
        <iframe
          src={project.url}
          title={project.name}
          className="w-full min-h-[70vh] lg:min-h-[80vh] bg-black/60"
          allow="fullscreen; clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}
