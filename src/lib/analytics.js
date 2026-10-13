import { sendGAEvent } from "@next/third-parties/google";

/**
 * trackEvent — record a GA4 event, or do nothing when GA is not loaded.
 *
 * Wraps @next/third-parties' sendGAEvent, which pushes
 * ("event", name, params) onto window.dataLayer exactly as gtag() would.
 * sendGAEvent itself console.warns when GA was never initialised, which
 * is every local and preview build (the <GoogleAnalytics> tag is gated
 * on NEXT_PUBLIC_GA_ID / production); the dataLayer guard here keeps
 * those builds silent. Safe to call during server rendering: the
 * `window` check turns it into a no-op there too.
 *
 * Call this only from client components or event handlers.
 *
 * Event names used on this site (GA4 recommended names where one fits):
 *   contact_phone_click  { link_text }      tel: link
 *   contact_email_click  { link_text }      mailto: link
 *   generate_lead        { method: "contact_form" }   form success
 */
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) {
    return;
  }
  sendGAEvent("event", name, params);
}
