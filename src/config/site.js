/**
 * Site configuration with environment-aware URLs
 * Set NEXT_PUBLIC_SITE_URL environment variable to override
 */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://alex-bergman-v2.vercel.app',
  name: "A.R.Bergman Drafting",
  description: "Professional architectural drafting services in Tacoma, WA",
};


