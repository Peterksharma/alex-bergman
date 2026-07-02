import { CardContent, CardHeader } from "@/components/ui/card";
import SurfaceCard from "@/components/common/SurfaceCard";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

/*
 * TestimonialCard — a filed report slip: quote mark and star row up
 * top, the client's words in body type, dated in the mono annotation
 * voice.
 */
export default function TestimonialCard({ testimonial }) {
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${index < rating ? "text-amber-400" : "text-tone-line/30"} text-lg`}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  };

  return (
    <SurfaceCard hover>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-4">
          <FaQuoteLeft className="text-tone-accent text-3xl opacity-50" aria-hidden="true" />
          {renderStars(testimonial.rating)}
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-tone-heading mb-1">
            {testimonial.name}
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-widest text-tone-accent">
            {testimonial.project}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-tone-body leading-relaxed mb-4">
          &quot;{testimonial.text}&quot;
        </p>

        <p className="font-mono text-[11px] uppercase tracking-wider text-tone-muted">
          {testimonial.date}
        </p>
      </CardContent>
    </SurfaceCard>
  );
}
