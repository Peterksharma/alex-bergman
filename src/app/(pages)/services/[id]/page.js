import { projects } from "@/data/projects";
import Project from "@/components/portfolio/project";



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