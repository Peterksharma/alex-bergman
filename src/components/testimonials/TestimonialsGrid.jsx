import { testimonials } from "./data/testimonialsData";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}

