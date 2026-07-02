import Image from "next/image";
import Link from "next/link";
import { CardTitle, CardDescription } from "@/components/ui/card";
import SurfaceCard from "@/components/common/SurfaceCard";

export default function PortfolioCard({ project, index = 0 }) {
  const sheetNo = `PROJ-${String(index + 1).padStart(2, "0")}`;

  return (
    <Link href={project.url} className="group">
      <SurfaceCard hover className="flex flex-col h-full overflow-hidden">
        <div className="relative w-full h-[280px] overflow-hidden">
          <Image
            src={`/assets/portfolio/${project.folder}/1.jpg`}
            alt={`${project.name} architectural drafting project by A.R.Bergman Drafting in Tacoma, WA`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* ink wash + mono view pill on hover */}
          <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="border border-amber-300 text-amber-300 font-mono text-[11px] uppercase tracking-widest rounded-full px-4 py-2">
              View project →
            </span>
          </div>
        </div>

        <div className="p-6 flex-grow">
          <p className="font-mono text-[10px] uppercase tracking-widest text-tone-muted mb-2">
            {sheetNo}
          </p>
          <CardTitle className="font-display text-xl font-bold text-tone-heading mb-2 group-hover:text-tone-accent transition-colors">
            {project.name}
          </CardTitle>
          <CardDescription className="text-tone-muted text-sm">
            Click to view project details
          </CardDescription>
        </div>
      </SurfaceCard>
    </Link>
  );
}
