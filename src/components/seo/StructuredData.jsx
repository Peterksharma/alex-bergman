import { contactData } from "@/data/global/contactInfo";
import { siteConfig } from "@/config/site";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    "name": "A.R.Bergman Drafting",
    "image": `${siteConfig.url}/assets/logo.png`,
    "description": "Professional architectural drafting services in Tacoma, WA. Custom home designs, additions, remodels, and detailed construction plans.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": contactData.address.street,
      "addressLocality": contactData.address.city,
      "addressRegion": contactData.address.state,
      "postalCode": contactData.address.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.2566,
      "longitude": -122.4841
    },
    "url": siteConfig.url,
    "telephone": contactData.phone.number,
    "email": contactData.email.address,
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "areaServed": {
      "@type": "City",
      "name": "Tacoma"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 47.2566,
        "longitude": -122.4841
      },
      "geoRadius": "80000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Architectural Drafting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Home Design",
            "description": "Professional custom home design and architectural drafting services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Remodels",
            "description": "Architectural drafting for home remodels and renovations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Additions",
            "description": "Design and drafting services for home additions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Construction Plans",
            "description": "Detailed construction documents and building plans"
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "A.R. Bergman"
    },
    "foundingDate": "2008"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

