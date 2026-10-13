import { siteConfig } from "@/config/site";

/**
 * ImageGallerySchema — schema.org ImageGallery (a CreativeWork subtype)
 * for a portfolio project, listing every image the page shows.
 *
 * Precondition: `project` is the plain object from src/db/queries.js:
 *   images[] = [{ src, alt, width, height }] in gallery order, where
 *   `src` is a site-relative /cdn/… path (or absolute when the bucket is
 *   fronted by a public host). This is the same array Project.jsx renders
 *   from, so the gallery described here is exactly the gallery a visitor
 *   sees.
 *
 * The business is referenced by @id only, so this node links to the
 * single LocalBusiness entity declared in StructuredData rather than
 * duplicating it.
 */
function absolute(src) {
  return /^https?:\/\//.test(src) ? src : `${siteConfig.url}${src}`;
}

export default function ImageGallerySchema({ project }) {
  const pageUrl = `${siteConfig.url}${project.url}`;
  const business = { "@id": `${siteConfig.url}/#localbusiness` };
  const total = project.images.length;

  const images = project.images.map((image, i) => ({
    "@type": "ImageObject",
    "contentUrl": absolute(image.src),
    "name": image.alt || `${project.name} — drawing ${i + 1} of ${total}`,
    ...(image.width && image.height ? { "width": image.width, "height": image.height } : {}),
    "creator": business,
    "copyrightHolder": business,
  }));

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${pageUrl}/#gallery`,
    "name": project.name,
    "headline": `${project.name} — architectural drafting project`,
    "description": project.summary || project.description,
    "url": pageUrl,
    "mainEntityOfPage": pageUrl,
    "isPartOf": { "@id": `${siteConfig.url}/#website` },
    "creator": business,
    "copyrightHolder": business,
    "dateModified": project.updatedAt instanceof Date
      ? project.updatedAt.toISOString()
      : project.updatedAt,
    ...(images[0] ? { "primaryImageOfPage": images[0] } : {}),
    "associatedMedia": images,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
    />
  );
}
