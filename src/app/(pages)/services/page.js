import ServiceCards from "@/components/services/AllServicesCards";
import { siteConfig } from "@/config/site";

// "architectural drafting services" is the site's top query (2,336
// impressions at position 10, zero clicks); this page's title carries
// the exact phrase and the description names both cities.
const description =
  "Architectural drafting services in Tacoma and Seattle, WA: permit-ready plans for remodels, additions, garages, ADUs and new homes. Free consultation.";

export const metadata = {
  title: "Architectural Drafting Services",
  alternates: { canonical: "/services" },
  description,
  openGraph: {
    title: "Architectural Drafting Services | A.R.Bergman Drafting",
    description,
    url: `${siteConfig.url}/services`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Architectural Drafting Services | A.R.Bergman Drafting",
    description,
  },
};

export default function ServicesPage() {
  return (
    <div>
      <ServiceCards />
    </div>
  );
}