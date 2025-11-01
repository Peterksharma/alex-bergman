import { ProcessHeader, ProcessTimeline, ProcessBenefits, ProcessCTA } from "@/components/process";

export default function OurProcessPage() {
  return (
    <div className="bg-gray-900 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProcessHeader />
        <ProcessTimeline />
        <ProcessBenefits />
        <ProcessCTA />
      </div>
    </div>
  );
}