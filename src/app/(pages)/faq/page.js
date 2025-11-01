import RenderFAQItems from "@/components/faq/renderFAQ";
import FAQSchema from "@/components/seo/FAQSchema";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions about A.R.Bergman Drafting services including architectural drafting, building permits, custom home design, remodels, and construction plans in Tacoma, WA.",
  keywords: [
    "drafting FAQ",
    "architectural drafting questions",
    "building permit questions",
    "drafting services FAQ",
    "custom home design FAQ",
    "construction plans FAQ"
  ],
  openGraph: {
    title: "FAQ | A.R.Bergman Drafting",
    description: "Get answers to frequently asked questions about architectural drafting services, building permits, and construction plans.",
    url: "https://www.arbergman.com/faq",
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
    <div className="bg-gray-900 pb-12">
      <FAQSchema />
      <div className="w-[90% mx-auto text-gray-100 bg-gray-900">
        <div>
          <RenderFAQItems />
        </div>
      </div>
    </div>
  );
}
