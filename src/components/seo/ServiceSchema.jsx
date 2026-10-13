import { areaServed } from "@/data/global/serviceAreas";
import { siteConfig } from "@/config/site";

/**
 * ServiceSchema — schema.org Service markup for a single service page,
 * linked back to the site-wide LocalBusiness node by @id so search
 * engines connect the service to the business's reviews, hours, and
 * location.
 */
export default function ServiceSchema({ service }) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}${service.url}/#service`,
    "name": `${service.name} Drafting & Design`,
    "serviceType": `${service.name} architectural drafting`,
    "description": service.description,
    "url": `${siteConfig.url}${service.url}`,
    "image": service.image ? `${siteConfig.url}${service.image}` : undefined,
    "provider": { "@id": `${siteConfig.url}/#localbusiness` },
    "areaServed": areaServed(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  );
}
