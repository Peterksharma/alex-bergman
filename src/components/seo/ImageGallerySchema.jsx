import { siteConfig } from "@/config/site";

/**
 * ImageGallerySchema — schema.org ImageGallery (a CreativeWork subtype)
 * for a portfolio project, listing every image in the project folder.
 *
 * Precondition: the images live at
 *   /assets/portfolio/{project.folder}/{1..project.imageCount}.jpg
 * which is the same contract Project.jsx renders from, so the gallery
 * described here is exactly the gallery a visitor sees.
 *
 * The business is referenced by @id only, so this node links to the
 * single LocalBusiness entity declared in StructuredData rather than
 * duplicating it.
 */
export default function ImageGallerySchema({ project }) {
  const pageUrl = `${siteConfig.url}${project.url}`;
  const business = { "@id": `${siteConfig.url}/#localbusiness` };

  const images = Array.from({ length: project.imageCount }, (_, i) => ({
    "@type": "ImageObject",
    "contentUrl": `${siteConfig.url}/assets/portfolio/${project.folder}/${i + 1}.jpg`,
    "name": `${project.name} — drawing ${i + 1} of ${project.imageCount}`,
    "creator": business,
    "copyrightHolder": business,
  }));

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${pageUrl}/#gallery`,
    "name": project.name,
    "headline": `${project.name} — architectural drafting project`,
    "description": project.description,
    "url": pageUrl,
    "mainEntityOfPage": pageUrl,
    "isPartOf": { "@id": `${siteConfig.url}/#website` },
    "creator": business,
    "copyrightHolder": business,
    "dateModified": project.lastModified,
    "primaryImageOfPage": images[0],
    "associatedMedia": images,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
    />
  );
}
