import { processSteps } from "@/data/processStepsData";
import ProcessStepCard from "./ProcessStepCard";

export default function ProcessTimeline() {
  return (
    <div className="relative">
      {/* the drafted centerline the steps hang from */}
      <div
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 h-full w-0 border-l border-dashed border-tone-line/40"
        aria-hidden="true"
      ></div>

      <div className="space-y-12">
        {processSteps.map((step, index) => (
          <ProcessStepCard key={step.id} step={step} index={index} />
        ))}
      </div>
    </div>
  );
}
