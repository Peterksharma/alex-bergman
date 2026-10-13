import Link from "next/link";
import { notFound } from "next/navigation";
import SurfaceCard from "@/components/common/SurfaceCard";
import { Button } from "@/components/ui/button";
import AdminShell from "../../_components/AdminShell";
import ProjectForm from "../../_components/ProjectForm";
import UploadForm from "../../_components/UploadForm";
import ImageList from "../../_components/ImageList";
import ConfirmSubmit from "../../_components/ConfirmSubmit";
import { requireAdmin } from "../../_lib/session";
import { getProjectById } from "@/db/queries";
import { deleteProjectAction, updateProjectAction } from "../../actions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = Number.isInteger(Number(id)) ? await getProjectById(Number(id)) : null;
  return { title: project ? `Edit ${project.name}` : "Project not found" };
}

export default async function EditProjectPage({ params, searchParams }) {
  const session = await requireAdmin();
  const { id } = await params;
  const { created } = await searchParams;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();
  const project = await getProjectById(numericId);
  if (!project) notFound();

  return (
    <AdminShell
      email={session.email}
      eyebrow={`Sheet · /${project.slug} · ${project.published ? "published" : "draft"}`}
      title={project.name}
      actions={
        project.published && (
          <Button asChild variant="outline">
            <Link href={project.url} target="_blank" rel="noreferrer">View page ↗</Link>
          </Button>
        )
      }
    >
      {created && (
        <p role="status" className="mb-6 rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-tone-heading">
          Project created. Now add photos below.
        </p>
      )}

      <div className="space-y-10">
        <section aria-labelledby="details-heading">
          <h2 id="details-heading" className="font-mono text-[11px] uppercase tracking-widest text-tone-muted mb-3">Details</h2>
          <SurfaceCard className="p-6 sm:p-8 gap-0">
            <ProjectForm action={updateProjectAction} project={project} submitLabel="Save changes" />
          </SurfaceCard>
        </section>

        <section aria-labelledby="photos-heading" className="space-y-4">
          <h2 id="photos-heading" className="font-mono text-[11px] uppercase tracking-widest text-tone-muted">
            Photos · {project.images.length}
          </h2>
          <ImageList project={project} />
          <SurfaceCard className="p-6 gap-0">
            <UploadForm projectId={project.id} slug={project.slug} />
          </SurfaceCard>
        </section>

        <section aria-labelledby="danger-heading">
          <h2 id="danger-heading" className="font-mono text-[11px] uppercase tracking-widest text-tone-muted mb-3">Remove</h2>
          <SurfaceCard className="p-6 gap-0 border-red-700/30">
            <form action={deleteProjectAction} className="flex flex-wrap items-center justify-between gap-4">
              <input type="hidden" name="id" value={project.id} />
              <p className="text-sm text-tone-body">
                Deletes the project, its {project.images.length} photo{project.images.length === 1 ? "" : "s"}, and its public page. This cannot be undone.
              </p>
              <ConfirmSubmit
                message={`Delete "${project.name}" and all its photos? This cannot be undone.`}
                className="rounded-md border border-red-700/50 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-red-700 hover:bg-red-700/10"
              >
                Delete project
              </ConfirmSubmit>
            </form>
          </SurfaceCard>
        </section>
      </div>
    </AdminShell>
  );
}
