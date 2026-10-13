import ContactForm from "@/components/contact/ContactForm";
import ContactDetails from "@/components/common/ContactDetails";
import Chapter from "@/components/common/Chapter";
import SectionHeader from "@/components/common/SectionHeader";
import { contactData } from "@/data/global/contactInfo";
import { serviceAreaCities } from "@/data/global/serviceAreas";
import { siteConfig } from "@/config/site";

const fullAddress = `${contactData.address.line1}, ${contactData.address.line2}`;

// Phone formatted for reading: "(888) 818-7526" from "(888)818-7526".
const phone = contactData.phone.number.replace(/^\((\d{3})\)/, "($1) ");

// Leads with the offer and the number so the snippet is itself a call
// to action; /contact has 606 impressions at 0.8% CTR.
const description = `Call ${phone} or message us for a free drafting consultation. ${fullAddress}; serving Seattle and Western Washington.`;

export const metadata = {
  title: "Free Consultation: Contact Us",
  alternates: { canonical: "/contact" },
  description,
  openGraph: {
    title: "Free Consultation: Contact Us | A.R.Bergman Drafting",
    description,
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Free Consultation: Contact Us | A.R.Bergman Drafting",
    description,
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
        <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-wrap justify-center gap-2">
          {serviceAreaCities.map((city) => (
            <span
              key={city}
              className="font-mono text-[11px] uppercase tracking-wider border border-tone-line/30 text-tone-muted px-3.5 py-1.5 rounded-full"
            >
              {city}, WA
            </span>
          ))}
        </div>
      </Chapter>
    </>
  );
}
