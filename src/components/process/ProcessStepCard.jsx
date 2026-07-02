import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SurfaceCard from "@/components/common/SurfaceCard";

const annoLabel = "font-mono text-[11px] uppercase tracking-widest text-tone-accent mb-1";

export default function ProcessStepCard({ step, index }) {
  return (
    <div key={step.id} className={`relative ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2'}`}>
      <SurfaceCard hover className={`relative ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}>
        <div className={`absolute -top-4 -left-4 ${index % 2 === 0 ? 'lg:-left-4' : 'lg:-right-4'} bg-amber-500 text-ink w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-xl shadow-lg z-10`}>
          {step.id}
        </div>

        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-tone-accent" aria-hidden="true">{step.icon}</span>
            <CardTitle className="font-display text-2xl font-bold text-tone-heading">
              {step.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-tone-body leading-relaxed text-base">
            {step.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-tone-line/25">
            <div>
              <p className={annoLabel}>Timeline</p>
              <p className="text-tone-body">{step.duration}</p>
            </div>
            <div>
              <p className={annoLabel}>Deliverable</p>
              <p className="text-tone-body">{step.deliverable}</p>
            </div>
          </div>
        </CardContent>
      </SurfaceCard>
    </div>
  );
}
