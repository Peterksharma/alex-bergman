import { projects } from "@/data/projectData";
import PortfolioCard from "./PortfolioCard";
import Reveal from "@/components/common/Reveal";

export default function PortfolioGrid() {
  return (
    <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <PortfolioCard key={index} project={project} index={index} />
      ))}
    </Reveal>
  );
}
