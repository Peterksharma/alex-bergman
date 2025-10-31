import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaCheckCircle, FaListOl } from "react-icons/fa";

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
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                        {service.name}
                    </h1>
                    <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
                        {service.description}
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Image Section - 2/3 width */}
                    <div className="lg:col-span-2">
                        <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                            <Image
                                src={service.image}
                                alt={service.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Quick Info Card - 1/3 width */}
                    <div className="lg:col-span-1">
                        <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-2xl h-full sticky top-8">
                            <CardHeader className="border-b border-gray-600">
                                <CardTitle className="text-2xl text-white text-center">
                                    Service Overview
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="pt-6 space-y-6">
                                {/* Timeline */}
                                {timeline && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <FaClock className="text-blue-400 text-xl" />
                                            <h3 className="text-lg font-bold text-white">Timeline</h3>
                                        </div>
                                        <p className="text-gray-300 pl-8">{timeline}</p>
                                    </div>
                                )}

                                {/* Category */}
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <FaCheckCircle className="text-blue-400 text-xl" />
                                        <h3 className="text-lg font-bold text-white">Category</h3>
                                    </div>
                                    <p className="text-gray-300 pl-8">{service.category}</p>
                                </div>

                                {/* CTA Button */}
                                <Button
                                    asChild
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg mt-6"
                                >
                                    <Link href="/contact">Get Started</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Detailed Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Process Section */}
                    {process && process.length > 0 && (
                        <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl">
                            <CardHeader className="border-b border-gray-600">
                                <div className="flex items-center gap-3">
                                    <FaListOl className="text-blue-400 text-2xl" />
                                    <CardTitle className="text-2xl text-white">Our Process</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ol className="list-decimal list-inside space-y-3 text-lg">
                                    {process}
                                </ol>
                            </CardContent>
                        </Card>
                    )}

                    {/* Benefits Section */}
                    {benefits && benefits.length > 0 && (
                        <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl">
                            <CardHeader className="border-b border-gray-600">
                                <div className="flex items-center gap-3">
                                    <FaCheckCircle className="text-blue-400 text-2xl" />
                                    <CardTitle className="text-2xl text-white">Key Benefits</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="space-y-3 text-lg">
                                    {benefits}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16 p-12 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl border border-blue-500/20">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Start Your {service.name} Project?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Contact us today for a free consultation and let's discuss how we can bring your vision to life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            <Link href="/contact">Schedule Consultation</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="h-12 px-8 bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
                        >
                            <Link href="/portfolio">View Our Work</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}