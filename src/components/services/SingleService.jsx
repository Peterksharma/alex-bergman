import { CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaCheckCircle, FaListOl } from "react-icons/fa";
import SectionHeader from "@/components/common/SectionHeader";
import CTASection from "@/components/common/CTASection";
import SurfaceCard from "@/components/common/SurfaceCard";

export default function SingleService({ service }) {
    const process = service.process?.map((item, index) => (
        <li key={index} className="mb-3 text-gray-200">{item}</li>
    ));

    const benefits = service.benefits?.map((item, index) => (
        <li key={index} className="mb-3 text-gray-200">{item}</li>
    ));

    const timeline = service.timeline;

    return (
        <div className="bg-gray-900 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title={service.name} subtitle={service.description} />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Image Section - 2/3 width */}
                    <div className="lg:col-span-2">
                        <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                            <Image
                                src={service.image}
                                alt={`${service.name} architectural drafting service example - ${service.category} project by A.R.Bergman Drafting in Tacoma, WA`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 66vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Quick Info Card - 1/3 width */}
                    <div className="lg:col-span-1">
                        <SurfaceCard className="shadow-2xl h-full sticky top-8">
                            <CardHeader className="border-b border-gray-600">
                                <h2 className="text-2xl text-white text-center font-semibold leading-none">
                                    Service Overview
                                </h2>
                            </CardHeader>

                            <CardContent className="pt-6 space-y-6">
                                {/* Timeline */}
                                {timeline && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <FaClock className="text-blue-400 text-xl" aria-hidden="true" />
                                            <h3 className="text-lg font-bold text-white">Timeline</h3>
                                        </div>
                                        <p className="text-gray-300 pl-8">{timeline}</p>
                                    </div>
                                )}

                                {/* Category */}
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <FaCheckCircle className="text-blue-400 text-xl" aria-hidden="true" />
                                        <h3 className="text-lg font-bold text-white">Category</h3>
                                    </div>
                                    <p className="text-gray-300 pl-8">{service.category}</p>
                                </div>

                                {/* CTA Button */}
                                <Button
                                    asChild
                                    className="w-full h-12 font-semibold transition-all duration-300 hover:scale-105 shadow-lg mt-6"
                                >
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </CardContent>
                        </SurfaceCard>
                    </div>
                </div>

                {/* Detailed Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Process Section */}
                    {process && process.length > 0 && (
                        <SurfaceCard>
                            <CardHeader className="border-b border-gray-600">
                                <div className="flex items-center gap-3">
                                    <FaListOl className="text-blue-400 text-2xl" aria-hidden="true" />
                                    <h2 className="text-2xl text-white font-semibold leading-none">Our Process</h2>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ol className="list-decimal list-inside space-y-3 text-lg">
                                    {process}
                                </ol>
                            </CardContent>
                        </SurfaceCard>
                    )}

                    {/* Benefits Section */}
                    {benefits && benefits.length > 0 && (
                        <SurfaceCard>
                            <CardHeader className="border-b border-gray-600">
                                <div className="flex items-center gap-3">
                                    <FaCheckCircle className="text-blue-400 text-2xl" aria-hidden="true" />
                                    <h2 className="text-2xl text-white font-semibold leading-none">Key Benefits</h2>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="space-y-3 text-lg">
                                    {benefits}
                                </ul>
                            </CardContent>
                        </SurfaceCard>
                    )}
                </div>

                <CTASection
                    heading={`Ready to Start Your ${service.name} Project?`}
                    text="Contact us today for a consultation and let's discuss how we can bring your vision to life."
                    actions={[
                        { label: "Schedule Consultation", href: "/contact" },
                        { label: "View Our Work", href: "/portfolio", variant: "ctaOutline" },
                    ]}
                />
            </div>
        </div>
    );
}
