import { notFound } from "next/navigation";
import { services } from "@/data/servicesData";
import SingleService from "@/components/services/SingleService";
import ServiceSchema from "@/components/seo/ServiceSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { truncateAtWord } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.url.replace("/services/", ""),
  }));
}

/**
 * singular — the service names are catalogue plurals ("Remodels",
 * "Garages", "Additions") but read naturally as modifiers in the
 * singular ("Remodel Drafting Services"). Stripping one trailing "s"
 * is exact for every current name; names that do not end in "s"
 * ("Conceptual Design", "A.D.U.") pass through untouched.
 */
const singular = (name) => name.replace(/s$/, "");

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = services.find(s => s.url === `/services/${id}`);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  // Absolute title: the "| A.R.Bergman Drafting" template suffix would
  // push the keyword + location form past 60 characters; the WebSite
  // schema on the root supplies the site name to Google instead.
  const title = `${singular(service.name)} Drafting Services | Tacoma & Seattle WA`;
  // Hand-written per service; the word-boundary cut of the long prose
  // description is only a fallback for an entry that lacks one.
  const description =
    service.seoDescription ?? truncateAtWord(service.description, 155);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/services/${id}` },
    openGraph: {
      title,
      description,
      images: service.image ? [service.image] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }) {
  const { id } = await params;
  const service = services.find(s => s.url === `/services/${id}`);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceSchema service={service} />
      <BreadcrumbSchema
        trail={[
          { name: "Services", path: "/services" },
          { name: service.name, path: service.url },
        ]}
      />
      <SingleService service={service} />
    </>
  );
}
