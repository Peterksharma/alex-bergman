import { projects } from "@/components/portfolio/projects/data/projectData";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioGrid() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {projects.map((project, index) => (
        <PortfolioCard key={index} project={project} />
      ))}
    </div>
  );
}

