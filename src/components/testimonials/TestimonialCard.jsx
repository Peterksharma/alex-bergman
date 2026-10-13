import { CardContent, CardHeader } from "@/components/ui/card";
import SurfaceCard from "@/components/common/SurfaceCard";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

/*
 * TestimonialCard — a filed report slip: quote mark and star row up
 * top, the client's words in body type, dated in the mono annotation
 * voice.
 */
export default function TestimonialCard({ testimonial }) {
  /*
   * The star row is one graphic: role="img" makes the aria-label a real
   * accessible name (aria-label on a plain div is ignored by assistive
   * tech), and the individual icons are decorative. Filled stars use
   * the tone accent so they clear 3:1 against the card on both tones
   * (WCAG 1.4.11): amber-400 on ink, amber-800 on paper.
   */
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${index < rating ? "text-tone-accent" : "text-tone-line/30"} text-lg`}
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
          {/* h2: the page's only h1 is the section title, so each card is a
              direct subsection — h3 here would skip a level (WCAG 1.3.1) */}
          <h2 className="font-display text-xl font-bold text-tone-heading mb-1">
            {testimonial.name}
          </h2>
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
