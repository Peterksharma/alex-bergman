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
                                    Owner and Founder of A.R.Bergman Drafting and Design LLC
                                </p>
                            </div>

                            {/* Bio Content */}
                            <div className="text-gray-200 text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4 max-w-2xl mx-auto lg:mx-0">
                                <p>
                                    A.R.Bergman Drafting and Design LLC has been owned and operated by Alexander Bergman since 2008. The business began while Alex completed his education in the Architectural Drafting Program at South Puget Sound Community College.
                                </p>
                                <p>
                                    While continually operating his business, Alex gained additional experience (8 years combined) working as the in-house Draftsperson for a construction company, later for a custom home designer, and for an Architectural firm, whom he is still working with today.
                                </p>
                                <p>
                                    A.R.Bergman Drafting and Design LLC has completed hundreds of successful projects all over Western Washington since then and hopes to continue to serve the community with fast, friendly, and affordable construction documents and charitable pro bono work.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}