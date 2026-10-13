import { siteConfig } from "@/config/site";

/**
 * WebSiteSchema — schema.org WebSite node, rendered once in the root
 * layout. Its purpose is the site name: Google reads `name` (and
 * `alternateName`) from the WebSite entity when it labels results, so
 * detail pages can spend their 60 title characters on keywords and
 * still show "A.R.Bergman Drafting" in the SERP.
 *
 * No SearchAction — the site has no search page, and advertising one
 * that does not exist would be flagged by the rich-results test.
 */
export default function WebSiteSchema() {
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    "url": siteConfig.url,
    "name": siteConfig.name,
    "alternateName": ["AR Bergman Drafting", "A.R. Bergman Drafting"],
    "inLanguage": "en-US",
    "publisher": { "@id": `${siteConfig.url}/#localbusiness` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
    />
  );
}
