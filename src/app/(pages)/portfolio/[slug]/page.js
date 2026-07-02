import { notFound } from "next/navigation";
import { projects } from "@/data/projectData";
import Project from "@/components/portfolio/projects/Project";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.name} | Portfolio`,
    description: project.description.substring(0, 160),
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: `${project.name} | A.R.Bergman Drafting Portfolio`,
      description: project.description.substring(0, 160),
      images: project.folder ? [`/assets/portfolio/${project.folder}/1.jpg`] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | A.R.Bergman Drafting Portfolio`,
      description: project.description.substring(0, 160),
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <Project project={project} />;
}
