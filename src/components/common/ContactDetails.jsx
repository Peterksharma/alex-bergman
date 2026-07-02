import { contactData } from "@/data/global/contactInfo";
import { CardContent, CardHeader } from "@/components/ui/card";
import SurfaceCard from "./SurfaceCard";

/**
 * ContactDetails — the business's phone / email / address block, rendered
 * from the single source of truth in @/data/global/contactInfo.
 *
 * Variants:
 *   "footer" — the compact label/value grid used in the site footer
 *   "card"   — the "Get In Touch" card used on the contact page
 *
 * Merges the previously duplicated footer/ContactsDetails and
 * contact/ContactsPageDetails components.
 */
export default function ContactDetails({ variant = "footer" }) {
  const hrefPhone = contactData.phone.number.replace(/\D/g, "");

  if (variant === "card") {
    return (
      <div className="w-full lg:w-1/2 lg:px-0">
        <SurfaceCard>
          <CardHeader className="pb-4 px-4 sm:px-6">
            <h2 className="text-center text-2xl sm:text-3xl text-white font-bold tracking-tight leading-none">
              Get In Touch
            </h2>
            <p className="text-center text-gray-300 text-xs sm:text-sm mt-2">
              We'd love to hear from you
            </p>
          </CardHeader>

          <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8">
            <div className="flex flex-col sm:grid sm:grid-cols-[140px_1fr] gap-y-4 sm:gap-x-6 sm:gap-y-6">
              <p className="text-gray-200 font-medium text-sm">Phone Number</p>
              <a
                className="flex gap-2 items-center text-white hover:text-blue-300 transition-colors"
                href={`tel:${hrefPhone}`}
              >
                <span className="flex-shrink-0 text-blue-400">{contactData.phone.icon}</span>
                <span>{contactData.phone.number}</span>
              </a>

              <p className="text-gray-200 font-medium text-sm">Email</p>
              <a
                className="flex gap-2 items-center text-white hover:text-blue-300 transition-colors break-all"
                href={`mailto:${contactData.email.address}`}
              >
                <span className="flex-shrink-0 text-blue-400">{contactData.email.icon}</span>
                <span>{contactData.email.address}</span>
              </a>

              <p className="text-gray-200 font-medium text-sm">Address</p>
              <div className="flex gap-2 items-start text-white">
                <span className="flex-shrink-0 text-blue-400 mt-1">{contactData.address.icon}</span>
                <div className="leading-relaxed">
                  {contactData.address.line1}
                  <br />
                  {contactData.address.line2}
                </div>
              </div>
            </div>
          </CardContent>
        </SurfaceCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start md:items-center text-gray-100 mx-auto w-full">
      <div className="grid grid-cols-[auto_1fr] gap-x-2 sm:gap-x-4 gap-y-3 sm:gap-y-2 w-full">
        <p className="text-gray-400 font-semibold text-sm sm:text-base">Phone Number:</p>
        <a
          className="flex gap-2 items-center text-sm sm:text-base break-all"
          href={`tel:${hrefPhone}`}
        >
          <span className="flex-shrink-0 text-base sm:text-lg">{contactData.phone.icon}</span>
          <span className="break-words">{contactData.phone.number}</span>
        </a>

        <p className="text-gray-400 font-semibold text-sm sm:text-base">Email:</p>
        <a
          className="flex gap-2 items-center text-sm sm:text-base break-all"
          href={`mailto:${contactData.email.address}`}
        >
          <span className="flex-shrink-0 text-base sm:text-lg">{contactData.email.icon}</span>
          <span className="break-words">{contactData.email.address}</span>
        </a>

        <p className="text-gray-400 font-semibold text-sm sm:text-base">Address:</p>
        <div className="flex gap-2 items-start">
          <span className="flex-shrink-0 text-base sm:text-lg mt-0.5">{contactData.address.icon}</span>
          <div className="text-sm sm:text-base">
            {contactData.address.line1}
            <br />
            {contactData.address.line2}
          </div>
        </div>
      </div>
    </div>
  );
}
