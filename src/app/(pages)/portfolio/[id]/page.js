import { projects } from "@/components/portfolio/projects/data/projectData";
import Project from "@/components/portfolio/projects/Project";



export default async function ProjectPage({params}) {
    const { id } = await params;

    
    if(!id){
        return <div>Loading the project...</div>
    }
    
    const project = projects.find(p => p.id === id)

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