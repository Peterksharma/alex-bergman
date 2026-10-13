"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * TrackedLink — an <a> that records a GA4 event on click, then lets the
 * browser follow the href as normal (tel:, mailto:, or a page).
 *
 * This is the only client component in the contact-details block: it
 * exists so ContactDetails can stay a server component and still fire
 * contact_phone_click / contact_email_click. Everything except `event`
 * and `params` is forwarded to the anchor unchanged.
 */
export default function TrackedLink({ event, params, children, ...anchorProps }) {
  return (
    <a
      {...anchorProps}
      onClick={() => trackEvent(event, params)}
    >
      {children}
    </a>
  );
}
