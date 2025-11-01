import { TestimonialsHeader, TestimonialsGrid, TestimonialsCTA, TrustIndicators } from "@/components/testimonials";
import AggregateRatingSchema from "@/components/seo/AggregateRatingSchema";

export const metadata = {
  title: "Testimonials",
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
    url: "https://www.arbergman.com/testimonials",
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
        <TestimonialsHeader />
        <TestimonialsGrid />
        <TestimonialsCTA />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustIndicators />
      </div>
    </div>
  );
}