import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SurfaceCard from "@/components/common/SurfaceCard";
import AdminShell from "./_components/AdminShell";
import { requireAdmin } from "./_lib/session";
import { listAllProjects } from "@/db/queries";
import { moveProjectAction, togglePublishedAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata = { title: "Projects" };

const iconBtn =
  "font-mono text-[11px] uppercase tracking-widest border border-tone-line/40 rounded px-2 py-1 " +
  "text-tone-heading hover:bg-tone-line/10 disabled:opacity-30 disabled:cursor-not-allowed";

export default async function AdminProjectsPage({ searchParams }) {
  const session = await requireAdmin();
  const { deleted } = await searchParams;
  const projects = await listAllProjects();

  return (
    <AdminShell
      email={session.email}
      eyebrow={`Project index · ${projects.length} sheets`}
      title="Projects"
      actions={
        <Button asChild variant="cta">
          <Link href="/admin/projects/new">New project</Link>
        </Button>
      }
    >
      {deleted && (
        <p role="status" className="mb-6 text-sm text-tone-body">Project deleted.</p>
      )}

      {projects.length === 0 ? (
        <SurfaceCard className="p-10 text-center">
          <p className="text-tone-body">No projects yet. Create the first one.</p>
        </SurfaceCard>
      ) : (
        <ol className="space-y-3">
          {projects.map((p, i) => (
            <li key={p.id}>
              <SurfaceCard className="flex flex-row items-center gap-4 p-3 sm:p-4">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded bg-ink/10">
                  {p.cover ? (
                    <Image src={p.cover.src} alt="" fill sizes="96px" className="object-cover" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase text-tone-muted">none</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-tone-muted">
                    PROJ-{String(i + 1).padStart(2, "0")} · {p.imageCount} photo{p.imageCount === 1 ? "" : "s"} · /{p.slug}
                  </p>
                  <Link href={`/admin/projects/${p.id}`} className="font-display text-lg font-bold text-tone-heading hover:text-tone-accent truncate block">
                    {p.name}
                  </Link>
                  {!p.published && (
                    <span className="inline-block mt-1 rounded-full border border-tone-line/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-tone-muted">
                      Draft
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <form action={moveProjectAction} className="flex gap-1">
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" name="direction" value="up" className={iconBtn} disabled={i === 0} aria-label={`Move ${p.name} up`}>↑</button>
                    <button type="submit" name="direction" value="down" className={iconBtn} disabled={i === projects.length - 1} aria-label={`Move ${p.name} down`}>↓</button>
                  </form>
                  <form action={togglePublishedAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="published" value={p.published ? "false" : "true"} />
                    <button type="submit" className={iconBtn} aria-pressed={p.published}>
                      {p.published ? "Published" : "Hidden"}
                    </button>
                  </form>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/projects/${p.id}`}>Edit</Link>
                  </Button>
                </div>
              </SurfaceCard>
            </li>
          ))}
        </ol>
      )}
    </AdminShell>
  );
}
