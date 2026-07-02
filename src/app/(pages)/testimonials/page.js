import SectionHeader from "@/components/common/SectionHeader";
import CTASection from "@/components/common/CTASection";
import StatGrid from "@/components/common/StatGrid";
import TestimonialsGrid from "@/components/testimonials/TestimonialsGrid";
import AggregateRatingSchema from "@/components/seo/AggregateRatingSchema";
import { trustIndicators } from "@/data/trustIndicatorsData";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Testimonials",
  alternates: { canonical: "/testimonials" },
  description: "Read client testimonials and reviews for A.R.Bergman Drafting. See why homeowners and builders trust us for their architectural drafting and design needs in Tacoma, WA.",
  keywords: [
    "A.R.Bergman Drafting reviews",
    "drafting services testimonials",
    "architectural drafting reviews",
    "Tacoma drafting company reviews",
    "customer testimonials drafting"
  ],
  openGraph: {
    title: "Testimonials | A.R.Bergman Drafting",
    description: "Read client testimonials and reviews for A.R.Bergman Drafting services.",
    url: `${siteConfig.url}/testimonials`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Testimonials | A.R.Bergman Drafting",
    description: "Read client testimonials and reviews for our drafting services.",
  },
};

export default function TestimonialsPage() {
  return (
    <div className="bg-gray-900 min-h-screen py-20">
      <AggregateRatingSchema />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={<>Client <span className="text-blue-400">Testimonials</span></>}
          subtitle="Don't just take our word for it. Hear what our satisfied clients in Tacoma and throughout the Pacific Northwest have to say about their experience working with A.R.Bergman Drafting for their architectural drafting, custom home design, and construction plan needs."
        />
        <TestimonialsGrid />
        <CTASection
          heading="Ready to Start Your Project?"
          text="Join our growing list of satisfied clients. Let us help bring your vision to life with professional drafting services."
          actions={[{ label: "Schedule Your Consultation", href: "/contact" }]}
        />
        <StatGrid items={trustIndicators} className="mt-16" />
      </div>
    </div>
  );
}
