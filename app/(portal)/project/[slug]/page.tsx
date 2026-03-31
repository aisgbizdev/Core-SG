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
        {project.slug === "sgcc" ? (
          <div className="p-8 bg-black/40 text-white space-y-4">
            <p className="text-lg font-semibold">SGCC dibuka di tab baru</p>
            <p className="text-sm text-muted">
              Demi kestabilan sesi dan autentikasi, aplikasi SGCC tidak di-embed lagi di portal.
              Gunakan tombol di bawah untuk membuka SGCC langsung.
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/20 transition"
            >
              Buka SGCC
            </a>
          </div>
        ) : (
          <iframe
            src={project.url}
            title={project.name}
            className="w-full min-h-[70vh] lg:min-h-[80vh] bg-black/60"
            allow="fullscreen; clipboard-read; clipboard-write"
          />
        )}
      </div>
    </div>
  );
}
