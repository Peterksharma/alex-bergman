import { services } from "@/components/services/data/servicesData";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function ServicesCards() {
  return (
    <div className="bg-gray-900 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Our <span className="text-blue-400">Services</span>
          </h1>
          <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Professional architectural drafting services tailored to your needs in Tacoma, WA. From custom home designs to remodels, additions, garages, and ADUs, we provide comprehensive drafting solutions for residential and commercial projects throughout the Pacific Northwest.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.name} architectural drafting service - ${service.category} project in Tacoma, WA`}
                  fill
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{service.timeline}</span>
                  </div>
                )}

                {/* Learn More Button */}
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 group-hover:shadow-lg"
                >
                  <Link href={service.url} className="flex items-center justify-center gap-2">
                    Learn More
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
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
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* CTA Section */}
        <div className="text-center mt-20 p-12 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl border border-blue-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            We're here to help! Contact us for a free consultation and we'll discuss the best solution for your project.
          </p>
          <Button
            asChild
            className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Link href="/contact" className="flex items-center gap-3">
              Schedule Free Consultation
              <FaArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}