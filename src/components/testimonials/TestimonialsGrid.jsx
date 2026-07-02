import { testimonials } from "@/data/testimonialsData";
import TestimonialCard from "./TestimonialCard";
import Reveal from "@/components/common/Reveal";

export default function TestimonialsGrid() {
  return (
    <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </Reveal>
  );
}
