import { notFound } from "next/navigation";
import { projects } from "@/data/projectData";
import Project from "@/components/portfolio/projects/Project";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ImageGallerySchema from "@/components/seo/ImageGallerySchema";
import { truncateAtWord } from "@/lib/seo";

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

  // Word-boundary cut: substring(0, 160) used to end snippets mid-word.
  const description = truncateAtWord(project.description, 155);

  return {
    title: `${project.name} | Portfolio`,
    description,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: `${project.name} | A.R.Bergman Drafting Portfolio`,
      description,
      images: project.folder ? [`/assets/portfolio/${project.folder}/1.jpg`] : [],
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
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Portfolio", path: "/portfolio" },
          { name: project.name, path: project.url },
        ]}
      />
      <ImageGallerySchema project={project} />
      <Project project={project} />
    </>
  );
}
