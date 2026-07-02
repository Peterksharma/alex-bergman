import { contactData } from "@/data/global/contactInfo";
import { CardContent, CardHeader } from "@/components/ui/card";
import SurfaceCard from "./SurfaceCard";

/**
 * ContactDetails — the business's phone / email / address block, rendered
 * from the single source of truth in @/data/global/contactInfo. Labels use
 * the mono annotation voice; values stay in body type. Tone-aware.
 *
 * Variants:
 *   "footer" — the compact label/value grid used in the site footer
 *   "card"   — the "Get In Touch" card used on the contact page
 */
const labelClass = "font-mono text-[11px] uppercase tracking-widest text-tone-muted";

export default function ContactDetails({ variant = "footer" }) {
  const hrefPhone = contactData.phone.number.replace(/\D/g, "");

  if (variant === "card") {
    return (
      <div className="w-full lg:w-1/2 lg:px-0">
        <SurfaceCard>
          <CardHeader className="pb-4 px-4 sm:px-6">
            <h2 className="font-display text-center text-2xl sm:text-3xl text-tone-heading font-bold tracking-tight leading-none">
              Get In Touch
            </h2>
            <p className="text-center text-tone-muted text-xs sm:text-sm mt-2">
              We'd love to hear from you
            </p>
          </CardHeader>

          <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8">
            <div className="flex flex-col sm:grid sm:grid-cols-[140px_1fr] gap-y-4 sm:gap-x-6 sm:gap-y-6 sm:items-center">
              <p className={labelClass}>Phone</p>
              <a
                className="flex gap-2 items-center text-tone-heading hover:text-tone-accent transition-colors"
                href={`tel:${hrefPhone}`}
              >
                <span className="flex-shrink-0 text-tone-accent">{contactData.phone.icon}</span>
                <span>{contactData.phone.number}</span>
              </a>

              <p className={labelClass}>Email</p>
              <a
                className="flex gap-2 items-center text-tone-heading hover:text-tone-accent transition-colors break-all"
                href={`mailto:${contactData.email.address}`}
              >
                <span className="flex-shrink-0 text-tone-accent">{contactData.email.icon}</span>
                <span>{contactData.email.address}</span>
              </a>

              <p className={labelClass}>Address</p>
              <div className="flex gap-2 items-start text-tone-heading">
                <span className="flex-shrink-0 text-tone-accent mt-1">{contactData.address.icon}</span>
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
    <div className="flex flex-col items-start md:items-center text-tone-body mx-auto w-full">
      <div className="grid grid-cols-[auto_1fr] gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-2 w-full items-center">
        <p className={labelClass}>Phone</p>
        <a
          className="flex gap-2 items-center text-sm sm:text-base break-all hover:text-tone-accent transition-colors"
          href={`tel:${hrefPhone}`}
        >
          <span className="flex-shrink-0 text-base sm:text-lg text-tone-accent">{contactData.phone.icon}</span>
          <span className="break-words">{contactData.phone.number}</span>
        </a>

        <p className={labelClass}>Email</p>
        <a
          className="flex gap-2 items-center text-sm sm:text-base break-all hover:text-tone-accent transition-colors"
          href={`mailto:${contactData.email.address}`}
        >
          <span className="flex-shrink-0 text-base sm:text-lg text-tone-accent">{contactData.email.icon}</span>
          <span className="break-words">{contactData.email.address}</span>
        </a>

        <p className={labelClass}>Address</p>
        <div className="flex gap-2 items-start">
          <span className="flex-shrink-0 text-base sm:text-lg mt-0.5 text-tone-accent">{contactData.address.icon}</span>
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
