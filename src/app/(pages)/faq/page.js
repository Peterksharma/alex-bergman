import FAQList from "@/components/faq/FAQList";
import FAQSchema from "@/components/seo/FAQSchema";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Frequently Asked Questions",
  alternates: { canonical: "/faq" },
  description: "Common questions about A.R.Bergman Drafting services including architectural drafting, building permits, custom home design, remodels, and construction plans in Tacoma, WA.",
  openGraph: {
    title: "FAQ | A.R.Bergman Drafting",
    description: "Get answers to frequently asked questions about architectural drafting services, building permits, and construction plans.",
    url: `${siteConfig.url}/faq`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FAQ | A.R.Bergman Drafting",
    description: "Get answers to frequently asked questions about our drafting services.",
  },
};

export default function FAQPage() {

  return (
    <>
      <FAQSchema />
      <FAQList />
    </>
  );
}
