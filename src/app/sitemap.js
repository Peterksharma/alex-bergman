import { services } from "@/data/servicesData";
import { siteConfig } from "@/config/site";
import { listPublishedProjects } from "@/db/queries";

/*
 * The sitemap is regenerated hourly and on every admin write
 * (revalidatePath('/sitemap.xml')), so new or unpublished projects reach
 * crawlers without a deploy. Project <lastmod> is the row's updated_at,
 * which the writers bump on any content or gallery change.
 *
 * If the database is unreachable the portfolio entries fall back to the
 * legacy static list so the sitemap is never empty for the crawler.
 */
export const revalidate = 3600;

async function portfolioEntries(baseUrl) {
  try {
    const projects = await listPublishedProjects();
    return projects.map((project) => ({
      url: `${baseUrl}${project.url}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (err) {
    console.error("sitemap: database unavailable, using static project list", err);
    const { projects } = await import("@/data/projectData");
    return projects.map((project) => ({
      url: `${baseUrl}${project.url}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  }
}

export default async function sitemap() {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/process`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic service pages
  const servicePages = services.map((service) => ({
    url: `${baseUrl}${service.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic portfolio pages (from the database)
  const portfolioPages = await portfolioEntries(baseUrl);

  return [...staticPages, ...servicePages, ...portfolioPages];
}
