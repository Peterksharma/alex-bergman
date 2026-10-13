import { services } from "@/data/servicesData";
import { siteConfig } from "@/config/site";
import { listPublishedProjects } from "@/db/queries";

/**
 * sitemap.xml — one entry per public route with an honest lastModified.
 *
 * The date is the content's last real change, not the build time: a
 * sitemap that stamps every URL with "now" on every deploy tells Google
 * nothing, and Google documents that it then ignores the field.
 *
 *   static routes  → the git last-commit date of the page file (table below)
 *   services       → the lastModified field on the data entry
 *   projects       → the row's updated_at, which admin writes bump on any
 *                    content or gallery change
 *
 * The sitemap is regenerated hourly and on every admin write
 * (revalidatePath('/sitemap.xml')), so new or unpublished projects reach
 * crawlers without a deploy. If the database is unreachable the portfolio
 * entries fall back to the legacy static list so the sitemap is never
 * empty for the crawler.
 *
 * changeFrequency and priority are deliberately omitted — Google ignores
 * both, and Bing treats them as hints at best.
 *
 * Invariant: every URL is absolute, on the canonical www host, and has no
 * trailing slash, matching the per-page alternates.canonical.
 */
export const revalidate = 3600;

/** Static routes: path → ISO date of the page file's last commit. */
const staticRoutes = [
  ["", "2026-10-12"], // src/app/page.js (+ layout metadata, service-area copy, hero video)
  ["/about", "2026-07-01"],
  ["/portfolio", "2026-10-12"],
  ["/services", "2026-10-12"],
  ["/testimonials", "2026-07-01"],
  ["/faq", "2026-07-01"],
  ["/process", "2026-07-01"],
  ["/contact", "2026-10-12"],
];

async function portfolioEntries() {
  try {
    const projects = await listPublishedProjects();
    return projects.map((project) => [project.url, project.updatedAt]);
  } catch (err) {
    console.error("sitemap: database unavailable, using static project list", err);
    const { projects } = await import("@/data/projectData");
    return projects.map((project) => [project.url, project.lastModified]);
  }
}

export default async function sitemap() {
  const baseUrl = siteConfig.url;
  const entry = ([path, lastModified]) => ({ url: `${baseUrl}${path}`, lastModified });

  return [
    ...staticRoutes.map(entry),
    ...services.map((service) => entry([service.url, service.lastModified])),
    ...(await portfolioEntries()).map(entry),
  ];
}
