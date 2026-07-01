import { notFound } from "next/navigation";
import { services } from "@/components/services/data/servicesData";
import SingleService from "@/components/services/SingleService";

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.url.replace("/services/", ""),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = services.find(s => s.url === `/services/${id}`);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  const description = service.description.substring(0, 160);

  return {
    title: `${service.name} Services`,
    description: description,
    alternates: { canonical: `/services/${id}` },
    keywords: [
      service.name.toLowerCase(),
      "architectural drafting",
      "Tacoma drafting services",
      service.category.toLowerCase(),
      "construction plans",
      "building design",
    ],
    openGraph: {
      title: `${service.name} Services | A.R.Bergman Drafting`,
      description: description,
      images: service.image ? [service.image] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} Services | A.R.Bergman Drafting`,
      description: description,
    },
  };
}

export default async function ServicePage({ params }) {
  const { id } = await params;
  const service = services.find(s => s.url === `/services/${id}`);

  if (!service) {
    notFound();
  }

  return <SingleService service={service} />;
}
