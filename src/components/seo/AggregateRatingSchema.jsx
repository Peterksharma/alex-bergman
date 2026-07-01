import { testimonials } from "@/components/testimonials/data/testimonialsData";
import { siteConfig } from "@/config/site";

export default function AggregateRatingSchema() {
  // Calculate average rating (all are 5, but this makes it dynamic)
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    "name": "A.R.Bergman Drafting",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": testimonials.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map((testimonial) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": testimonial.text,
      // Normalize year-only dates ("2024") to full ISO 8601 for validators
      "datePublished": /^\d{4}$/.test(testimonial.date) ? `${testimonial.date}-01-01` : testimonial.date
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
    />
  );
}

