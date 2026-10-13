import { siteConfig } from "@/config/site";

/**
 * BreadcrumbSchema — schema.org BreadcrumbList for a detail page.
 *
 * `trail` is the ordered list of crumbs *below* the home page, each
 * `{ name, path }` with an absolute site path ("/services/adu"). Home
 * is prepended automatically so every list starts at the root and the
 * positions are 1-based and contiguous, as Google's validator requires.
 *
 * Rendered from the route's page file (not the presentational component)
 * so the markup travels with the URL, not with the UI.
 */
export default function BreadcrumbSchema({ trail }) {
  const crumbs = [{ name: "Home", path: "" }, ...trail];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${siteConfig.url}${crumb.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
