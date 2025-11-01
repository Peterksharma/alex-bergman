import { projects } from "@/components/portfolio/projects/data/projectData";
import Project from "@/components/portfolio/projects/Project";



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