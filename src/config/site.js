/**
 * Site configuration with environment-aware URLs
 * Set NEXT_PUBLIC_SITE_URL environment variable to override
 */
export const siteConfig = {
  // www is the canonical host — the apex 308-redirects to it in production
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arbergman.com',
  name: "A.R.Bergman Drafting",
  description: "Professional architectural drafting services in Tacoma, WA",
};


