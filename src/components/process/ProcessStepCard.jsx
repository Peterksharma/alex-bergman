import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SurfaceCard from "@/components/common/SurfaceCard";

const annoLabel = "font-mono text-[11px] uppercase tracking-widest text-tone-accent mb-1";

export default function ProcessStepCard({ step, index }) {
  const isLeft = index % 2 === 0;
  return (
    /* Cards alternate sides of the dashed centerline on desktop;
       the step number sits toward the spine so the sequence reads
       straight down the middle of the sheet. */
    <div key={step.id} className={`relative lg:w-1/2 ${isLeft ? "lg:pr-10" : "lg:ml-auto lg:pl-10"}`}>
      <SurfaceCard hover className="relative">
        <div className={`absolute -top-4 -left-4 ${isLeft ? "lg:left-auto lg:-right-4" : "lg:-left-4"} bg-amber-500 text-ink w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-xl shadow-lg z-10`}>
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
