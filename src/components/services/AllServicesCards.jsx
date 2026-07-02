import { services } from "@/data/servicesData";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Chapter from "@/components/common/Chapter";
import Reveal from "@/components/common/Reveal";
import SectionHeader from "@/components/common/SectionHeader";
import CTASection from "@/components/common/CTASection";
import SurfaceCard from "@/components/common/SurfaceCard";

const whyChooseUs = [
  {
    title: "Fast Turnaround",
    body: "Quick, efficient architectural drafting service without compromising on quality or attention to detail for your Tacoma construction projects.",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Affordable Rates",
    body: "Professional architectural drafting and design services at competitive prices that work with your budget for residential and commercial projects.",
    iconPath:
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "15+ Years Experience",
    body: "Proven expertise in architectural drafting with hundreds of successful custom home, remodel, and commercial projects across Tacoma and the Pacific Northwest.",
    iconPath:
      "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5",
  },
];

// headingAs: "h1" on /services (page title), "h2" on the home page,
// which already has its own h1 in the hero — a page must have exactly one h1.
export default function ServicesCards({ headingAs = "h1" }) {
  return (
    <>
      {/* Services grid — paper chapter */}
      <Chapter tone="paper" grid className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            as={headingAs}
            eyebrow="Sheet A-2 · Our services"
            title={<>Our <span className="text-tone-accent">Services</span></>}
            subtitle="Professional architectural drafting services tailored to your needs in Tacoma, WA. From custom home designs to remodels, additions, garages, and ADUs, we provide comprehensive drafting solutions for residential and commercial projects throughout the Pacific Northwest."
          />

          <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <SurfaceCard key={index} hover className="group overflow-hidden">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.name} architectural drafting service - ${service.category} project in Tacoma, WA`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div>

                  {/* Service Name Overlay — always over the photo, keeps ink-tone text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="font-display text-2xl font-bold text-white mb-2">
                      {service.name}
                    </h2>
                    <span className="inline-block px-3 py-1 border border-amber-400/70 text-amber-300 bg-ink/40 backdrop-blur-sm font-mono text-[11px] uppercase tracking-wider rounded-full">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-6">
                  <p className="text-tone-body leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Timeline Badge */}
                  {service.timeline && (
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-tone-muted mb-4">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{service.timeline}</span>
                    </div>
                  )}

                  {/* Learn More — quiet accent link; the chapter's filled
                      amber belongs to the consultation CTA below */}
                  <Link
                    href={service.url}
                    className="inline-flex items-center gap-2 font-semibold text-tone-accent hover:underline underline-offset-4"
                  >
                    Learn More
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </CardContent>
              </SurfaceCard>
            ))}
          </Reveal>
        </div>
      </Chapter>

      {/* Why choose us + CTA — ink chapter */}
      <Chapter tone="ink" grid className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            as="h2"
            eyebrow="General notes"
            title={<>Why Choose <span className="text-tone-accent">A.R.Bergman Drafting?</span></>}
            className="mb-12"
          />

          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="text-center p-6">
                {/* drawn circle, not a filled button */}
                <div className="border-2 border-tone-line/40 text-tone-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.iconPath} />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-tone-heading mb-2">{item.title}</h3>
                <p className="text-tone-body">{item.body}</p>
              </div>
            ))}
          </Reveal>

          <CTASection
            className="mt-20"
            heading="Not Sure Which Service You Need?"
            text="We're here to help! Contact us for a consultation and we'll discuss the best solution for your project."
            actions={[{ label: "Schedule A Consultation", href: "/contact", withArrow: true }]}
          />
        </div>
      </Chapter>
    </>
  );
}
