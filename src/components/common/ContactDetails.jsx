import { contactData } from "@/data/global/contactInfo";
import { CardContent, CardHeader } from "@/components/ui/card";
import SurfaceCard from "./SurfaceCard";
import TrackedLink from "./TrackedLink";

/**
 * ContactDetails — the business's phone / email / address block, rendered
 * from the single source of truth in @/data/global/contactInfo. Labels use
 * the mono annotation voice; values stay in body type. Tone-aware.
 *
 * Markup: a <dl> of label (<dt>) / value (<dd>) pairs, so assistive tech
 * reads "Phone: (888)…" as one association rather than two unrelated
 * paragraphs. The grid is applied to the <dl> itself; <dt>/<dd> are its
 * direct children, which keeps the two-column label/value layout.
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
            <dl className="flex flex-col sm:grid sm:grid-cols-[140px_1fr] gap-y-4 sm:gap-x-6 sm:gap-y-6 sm:items-center">
              <dt className={labelClass}>Phone</dt>
              <dd>
                <TrackedLink
                  className="flex gap-2 items-center text-tone-heading hover:text-tone-accent transition-colors"
                  href={`tel:${hrefPhone}`}
                  event="contact_phone_click"
                  params={{ link_text: contactData.phone.number, location: variant }}
                >
                  <span className="flex-shrink-0 text-tone-accent" aria-hidden="true">{contactData.phone.icon}</span>
                  <span>{contactData.phone.number}</span>
                </TrackedLink>
              </dd>

              <dt className={labelClass}>Email</dt>
              <dd>
                <TrackedLink
                  className="flex gap-2 items-center text-tone-heading hover:text-tone-accent transition-colors break-all"
                  href={`mailto:${contactData.email.address}`}
                  event="contact_email_click"
                  params={{ link_text: contactData.email.address, location: variant }}
                >
                  <span className="flex-shrink-0 text-tone-accent" aria-hidden="true">{contactData.email.icon}</span>
                  <span>{contactData.email.address}</span>
                </TrackedLink>
              </dd>

              <dt className={labelClass}>Address</dt>
              <dd className="flex gap-2 items-start text-tone-heading">
                <span className="flex-shrink-0 text-tone-accent mt-1" aria-hidden="true">{contactData.address.icon}</span>
                <span className="leading-relaxed">
                  {contactData.address.line1}
                  <br />
                  {contactData.address.line2}
                </span>
              </dd>
            </dl>
          </CardContent>
        </SurfaceCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start md:items-center text-tone-body mx-auto w-full">
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-2 w-full items-center">
        <dt className={labelClass}>Phone</dt>
        <dd>
          <TrackedLink
            className="flex gap-2 items-center text-sm sm:text-base break-all hover:text-tone-accent transition-colors"
            href={`tel:${hrefPhone}`}
            event="contact_phone_click"
            params={{ link_text: contactData.phone.number, location: variant }}
          >
            <span className="flex-shrink-0 text-base sm:text-lg text-tone-accent" aria-hidden="true">{contactData.phone.icon}</span>
            <span className="break-words">{contactData.phone.number}</span>
          </TrackedLink>
        </dd>

        <dt className={labelClass}>Email</dt>
        <dd>
          <TrackedLink
            className="flex gap-2 items-center text-sm sm:text-base break-all hover:text-tone-accent transition-colors"
            href={`mailto:${contactData.email.address}`}
            event="contact_email_click"
            params={{ link_text: contactData.email.address, location: variant }}
          >
            <span className="flex-shrink-0 text-base sm:text-lg text-tone-accent" aria-hidden="true">{contactData.email.icon}</span>
            <span className="break-words">{contactData.email.address}</span>
          </TrackedLink>
        </dd>

        <dt className={labelClass}>Address</dt>
        <dd className="flex gap-2 items-start">
          <span className="flex-shrink-0 text-base sm:text-lg mt-0.5 text-tone-accent" aria-hidden="true">{contactData.address.icon}</span>
          <span className="text-sm sm:text-base">
            {contactData.address.line1}
            <br />
            {contactData.address.line2}
          </span>
        </dd>
      </dl>
    </div>
  );
}
