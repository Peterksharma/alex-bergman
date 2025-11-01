import { TestimonialsHeader, TestimonialsGrid, TestimonialsCTA, TrustIndicators } from "@/components/testimonials";

export default function TestimonialsPage() {
  return (
    <div className="bg-gray-900 min-h-screen py-20">
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