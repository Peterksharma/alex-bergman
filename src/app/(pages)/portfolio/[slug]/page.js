import { notFound } from "next/navigation";
import Project from "@/components/portfolio/projects/Project";
import { getProjectBySlug, listPublishedSlugs } from "@/db/queries";

/*
 * ISR: each project page is rendered from the database at most once an
 * hour, or immediately after an admin write (revalidatePath). Slugs not
 * known at build time (projects created later in /admin) are rendered on
 * first request thanks to dynamicParams.
 */
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await listPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const description = (project.summary || project.description).substring(0, 160);

  return {
    title: `${project.name} | Portfolio`,
    description,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: `${project.name} | A.R.Bergman Drafting Portfolio`,
      description,
      images: project.cover ? [project.cover.src] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | A.R.Bergman Drafting Portfolio`,
      description,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <Project project={project} />;
}
