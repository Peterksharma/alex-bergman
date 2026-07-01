import { ProcessHeader, ProcessTimeline, ProcessBenefits, ProcessCTA } from "@/components/process";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Our Process",
  alternates: { canonical: "/process" },
  description: "Learn about A.R.Bergman Drafting's step-by-step process for architectural drafting projects. From initial consultation to final construction documents and permit approval in Tacoma, WA.",
  keywords: [
    "architectural drafting process",
    "drafting workflow",
    "building permit process",
    "construction documents process",
    "drafting consultation process",
    "Tacoma permit process"
  ],
  openGraph: {
    title: "Our Process | A.R.Bergman Drafting",
    description: "Learn about our step-by-step process for architectural drafting projects from consultation to permit approval.",
    url: `${siteConfig.url}/process`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Our Process | A.R.Bergman Drafting",
    description: "Learn about our step-by-step drafting process.",
  },
};

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