import ClippedPortrait from "@/components/about/people/ClippedPortrait";
import { Card, CardContent } from "@/components/ui/card";

export default function Staff() {
    return (
        <div className="py-12 sm:py-16 md:py-24 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4">
                {/* Mobile Layout: Stacked */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:relative">
                    {/* Portrait - centered on mobile, absolutely positioned on desktop */}
                    <div className="flex justify-center mb-6 lg:absolute lg:left-0 lg:z-10 lg:mb-0">
                        <ClippedPortrait />
                    </div>

                    {/* Content Card */}
                    <Card className="bg-gradient-to-br from-gray-600 to-gray-700 border-0 shadow-2xl lg:ml-[350px]">
                        <CardContent className="px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12 lg:pl-48 lg:pr-12">
                            {/* Header */}
                            <div className="text-center mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                                    <span className="text-blue-400">Meet</span>{" "}
                                    <span className="text-white">Alex Bergman</span>
                                </h2>
                                <p className="text-gray-300 text-base sm:text-lg font-semibold">
                                    Owner and Founder of A.R.Bergman Drafting and Design
                                </p>
                            </div>

                            {/* Bio Content */}
                            <div className="text-gray-200 text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4 max-w-2xl mx-auto lg:mx-0">
                                <p>
                                    Alex Bergman brings over 15 years of experience in architectural drafting and design to every project. With a passion for creating functional, beautiful spaces that meet both aesthetic and practical needs, Alex founded A.R.Bergman Drafting in 2008 to serve homeowners and builders throughout Tacoma and the Pacific Northwest.
                                </p>
                                <p>
                                    Specializing in custom home design, remodels, additions, and commercial drafting services, Alex works closely with clients to transform their visions into detailed construction documents. Whether it's a small garage addition or a complete home rebuild, every project receives the same attention to detail, code compliance, and professional drafting standards. With hundreds of successful projects completed, Alex understands the importance of clear communication, timely delivery, and cost-effective solutions for architectural drafting needs.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}