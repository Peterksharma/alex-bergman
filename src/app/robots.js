import { siteConfig } from "@/config/site";

/**
 * robots.txt — every route on this site is public and indexable, so the
 * single rule allows everything. (An earlier version disallowed "/api/",
 * but no such route exists; the contact form is a server action posted
 * to /contact, which crawlers never invoke.)
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
