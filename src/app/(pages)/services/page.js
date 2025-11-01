import ServiceCards from "@/components/services/AllServicesCards";

export const metadata = {
  title: "Services",
  description: "Comprehensive architectural drafting services including custom home design, remodels, additions, garages, ADUs, commercial buildings, and construction plans. Serving Tacoma, WA and the Pacific Northwest.",
  keywords: [
    "architectural drafting services",
    "custom home design Tacoma",
    "home remodeling plans",
    "garage design services",
    "ADU drafting Tacoma",
    "commercial drafting services",
    "construction documents"
  ],
  openGraph: {
    title: "Services | A.R.Bergman Drafting",
    description: "Professional architectural drafting services for custom homes, remodels, additions, garages, and commercial projects in Tacoma, WA.",
    url: "https://www.arbergman.com/services",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Services | A.R.Bergman Drafting",
    description: "Professional architectural drafting services for all your building needs.",
  },
};

export default function ServicesPage() {
  return (
    <div>
      <ServiceCards />
    </div>
  );
}