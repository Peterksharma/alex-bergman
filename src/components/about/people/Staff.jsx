import ClippedPortrait from "@/components/about/people/ClippedPortrait";
import { CardContent } from "@/components/ui/card";
import SurfaceCard from "@/components/common/SurfaceCard";

export default function Staff() {
    return (
        <div className="py-12 sm:py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4">
                {/* Mobile Layout: Stacked */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:relative">
                    {/* Portrait - centered on mobile, absolutely positioned on desktop */}
                    <div className="flex justify-center mb-6 lg:absolute lg:left-0 lg:z-10 lg:mb-0">
                        <ClippedPortrait />
                    </div>

                    {/* Content Card */}
                    <SurfaceCard className="shadow-2xl lg:ml-[350px]">
                        <CardContent className="px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12 lg:pl-48 lg:pr-12">
                            {/* Header */}
                            <div className="text-center mb-6 sm:mb-8">
                                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                                    <span className="text-tone-accent">Meet</span>{" "}
                                    <span className="text-tone-heading">Alex Bergman</span>
                                </h2>
                                <p className="font-mono text-[11px] uppercase tracking-widest text-tone-muted">
                                    Owner &amp; Founder · A.R.Bergman Drafting and Design LLC
                                </p>
                            </div>

                            {/* Bio Content */}
                            <div className="text-tone-body text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4 max-w-2xl mx-auto lg:mx-0">
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
                    </SurfaceCard>
                </div>
            </div>
        </div>
    );
}
