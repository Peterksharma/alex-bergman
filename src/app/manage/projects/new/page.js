import SurfaceCard from "@/components/common/SurfaceCard";
import AdminShell from "../../_components/AdminShell";
import ProjectForm from "../../_components/ProjectForm";
import { requireAdmin } from "../../_lib/session";
import { createProjectAction } from "../../actions";

export const dynamic = "force-dynamic";

export const metadata = { title: "New project" };

export default async function NewProjectPage() {
  const session = await requireAdmin();

  return (
    <AdminShell username={session.username} eyebrow="New sheet" title="New project">
      <SurfaceCard className="p-6 sm:p-8 gap-0">
        <p className="mb-6 text-sm text-tone-muted">
          Save the details first; photos can be added on the next screen.
        </p>
        <ProjectForm action={createProjectAction} submitLabel="Create project" />
      </SurfaceCard>
    </AdminShell>
  );
}
