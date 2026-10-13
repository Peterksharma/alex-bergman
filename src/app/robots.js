import { siteConfig } from "@/config/site";

/**
 * robots.txt — every public route is indexable; only the admin area is
 * excluded. (An earlier version disallowed "/api/", but no such route
 * exists; the contact form is a server action posted to /contact, which
 * crawlers never invoke.) /manage also sets robots noindex in its layout;
 * the disallow here keeps crawlers from fetching the login page at all.
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/manage", "/manage/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
