import ContactForm from "@/components/contact/ContactForm";
import ContactDetails from "@/components/common/ContactDetails";
import Chapter from "@/components/common/Chapter";
import SectionHeader from "@/components/common/SectionHeader";
import { contactData } from "@/data/global/contactInfo";
import { siteConfig } from "@/config/site";

const fullAddress = `${contactData.address.line1}, ${contactData.address.line2}`;

export const metadata = {
  title: "Contact Us",
  alternates: { canonical: "/contact" },
  description: `Get in touch with A.R.Bergman Drafting for your architectural drafting needs. Located at ${fullAddress}. Contact us for custom home designs, remodels, additions, and construction plans.`,
  keywords: [
    "contact A.R.Bergman Drafting",
    "Tacoma drafting contact",
    "architectural drafting consultation",
    "drafting services Tacoma",
    `${contactData.address.street} Tacoma`,
    "free consultation drafting"
  ],
  openGraph: {
    title: "Contact A.R.Bergman Drafting | Get a Free Consultation",
    description: "Contact A.R.Bergman Drafting for your architectural drafting needs. Located in Tacoma, WA. Get a free consultation for your project.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact A.R.Bergman Drafting",
    description: "Get in touch for your architectural drafting needs. Free consultation available.",
  },
};

export default function Contact() {
  return (
    <>
      <Chapter tone="ink" grid className="pt-12 pb-10 sm:pt-16 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            className="mb-0"
            eyebrow="Sheet G-1 · Start your project"
            title="Contact Us"
            subtitle={`Ready to start your architectural drafting project? Located in Tacoma, WA at ${contactData.address.street}, we serve clients throughout the Pacific Northwest. Get in touch for a free consultation about your custom home design, remodel, addition, or commercial project. Our experienced team is here to help bring your vision to life with professional drafting services.`}
          />
        </div>
      </Chapter>

      <Chapter tone="paper" grid className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6 px-4">
          <ContactForm />
          <ContactDetails variant="card" />
        </div>
      </Chapter>
    </>
  );
}
