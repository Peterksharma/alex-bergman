import PortfolioCard from "./PortfolioCard";
import Reveal from "@/components/common/Reveal";

/**
 * PortfolioGrid — the card grid on /portfolio.
 * `projects` is the array from listPublishedProjects(), already in display
 * order; this component only lays it out.
 */
export default function PortfolioGrid({ projects }) {
  if (projects.length === 0) {
    return (
      <p className="text-center text-tone-muted font-mono text-sm uppercase tracking-widest py-12">
        No projects published yet.
      </p>
    );
  }

  return (
    <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <PortfolioCard key={project.id} project={project} index={index} />
      ))}
    </Reveal>
  );
}
