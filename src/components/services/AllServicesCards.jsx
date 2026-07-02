import { services } from "@/data/servicesData";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import SectionHeader from "@/components/common/SectionHeader";
import CTASection from "@/components/common/CTASection";
import SurfaceCard from "@/components/common/SurfaceCard";

// headingAs: "h1" on /services (page title), "h2" on the home page,
// which already has its own h1 in the hero — a page must have exactly one h1.
export default function ServicesCards({ headingAs = "h1" }) {
  return (
    <div className="bg-gray-900 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          as={headingAs}
          title={<>Our <span className="text-blue-400">Services</span></>}
          subtitle="Professional architectural drafting services tailored to your needs in Tacoma, WA. From custom home designs to remodels, additions, garages, and ADUs, we provide comprehensive drafting solutions for residential and commercial projects throughout the Pacific Northwest."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Service Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {service.name}
                  </h2>
                  <span className="inline-block px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-6">
                <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Timeline Badge */}
                {service.timeline && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{service.timeline}</span>
                  </div>
                )}

                {/* Learn More Button */}
                <Button
                  asChild
                  className="w-full font-semibold transition-all duration-300 group-hover:shadow-lg"
                >
                  <Link href={service.url} className="flex items-center justify-center gap-2">
                    Learn More
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </SurfaceCard>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose <span className="text-blue-400">A.R.Bergman Drafting?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Turnaround</h3>
              <p className="text-gray-300">
                Quick, efficient architectural drafting service without compromising on quality or attention to detail for your Tacoma construction projects.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Affordable Rates</h3>
              <p className="text-gray-300">
                Professional architectural drafting and design services at competitive prices that work with your budget for residential and commercial projects.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">15+ Years Experience</h3>
              <p className="text-gray-300">
                Proven expertise in architectural drafting with hundreds of successful custom home, remodel, and commercial projects across Tacoma and the Pacific Northwest.
              </p>
            </div>
          </div>
        </div>

        <CTASection
          className="mt-20"
          heading="Not Sure Which Service You Need?"
          text="We're here to help! Contact us for a consultation and we'll discuss the best solution for your project."
          actions={[{ label: "Schedule A Consultation", href: "/contact", withArrow: true }]}
        />
      </div>
    </div>
  );
}
