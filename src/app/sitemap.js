import { services } from "@/data/servicesData";
import { projects } from "@/data/projectData";
import { siteConfig } from "@/config/site";

/**
 * sitemap.xml — one entry per public route with an honest lastModified.
 *
 * The date is the content's last real change, not the build time: a
 * sitemap that stamps every URL with "now" on every deploy tells Google
 * nothing, and Google documents that it then ignores the field. Static
 * routes carry the git last-commit date of their page file; services
 * and projects carry the lastModified field on their data entry.
 *
 * changeFrequency and priority are deliberately omitted — Google ignores
 * both, and Bing treats them as hints at best.
 *
 * Invariant: every URL below is absolute, on the canonical www host, and
 * has no trailing slash, matching the per-page alternates.canonical.
 */

/** Static routes: path → ISO date of the page file's last commit. */
const staticRoutes = [
  ["", "2026-10-12"], // src/app/page.js (+ layout metadata, service-area copy)
  ["/about", "2026-07-01"],
  ["/portfolio", "2026-07-01"],
  ["/services", "2026-10-12"],
  ["/testimonials", "2026-07-01"],
  ["/faq", "2026-07-01"],
  ["/process", "2026-07-01"],
  ["/contact", "2026-10-12"],
];

export default function sitemap() {
  const baseUrl = siteConfig.url;

  const entry = (path, lastModified) => ({
    url: `${baseUrl}${path}`,
    lastModified,
  });

  return [
    ...staticRoutes.map(([path, date]) => entry(path, date)),
    ...services.map((service) => entry(service.url, service.lastModified)),
    ...projects.map((project) => entry(project.url, project.lastModified)),
  ];
}
