import SectionHeader from "@/components/common/SectionHeader";
import CTASection from "@/components/common/CTASection";
import ProcessTimeline from "@/components/process/ProcessTimeline";
import ProcessBenefits from "@/components/process/ProcessBenefits";
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
        <SectionHeader
          title={<>Our <span className="text-blue-400">Process</span></>}
          subtitle="From initial consultation to final construction support, we guide you through every step of the architectural drafting process in Tacoma, WA. Our proven workflow ensures your custom home design, remodel, or addition receives professional drafting services, accurate construction documents, and smooth permit approval."
        />
        <ProcessTimeline />
        <ProcessBenefits />
        <CTASection
          className="mt-20"
          heading="Ready to Get Started?"
          text="Let's discuss your project and how our proven process can bring your vision to life."
          actions={[{ label: "Schedule Your Consultation", href: "/contact" }]}
        />
      </div>
    </div>
  );
}
