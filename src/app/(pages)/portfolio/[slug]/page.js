import { projects } from "@/components/portfolio/projects/data/projectData";
import Project from "@/components/portfolio/projects/Project";

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

export default async function ProjectPage({params}) {
    const { slug } = await params;

    
    if(!slug){
        return <div>Loading the project...</div>
    }
    
    const project = projects.find(p => p.slug === slug)

    if (!project) {
        return <div>No project found.</div>
    }


    return(
        <div>
            <div>
            <Project project={project}/>
            </div>
        </div>
    )
}