import { processSteps } from "./data/processStepsData";
import ProcessStepCard from "./ProcessStepCard";

export default function ProcessTimeline() {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-400"></div>

      <div className="space-y-12">
        {processSteps.map((step, index) => (
          <ProcessStepCard key={step.id} step={step} index={index} />
        ))}
      </div>
    </div>
  );
}

