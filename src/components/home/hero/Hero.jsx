import { Button } from "../../ui/button";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/common/Eyebrow";

/*
 * Hero — the site's cover sheet. The photo sits under an ink wash and
 * a faint blueprint grid (vellum over the site), and the headline
 * carries a self-drawing amber pencil stroke.
 */
export default function Hero() {
    return (
        <div className="relative min-h-[700px] bg-ink">
            {/* Background Image */}
            <Image
                src="/assets/hero-bg.jpg"
                alt="A.R.Bergman Drafting - Professional architectural drafting and custom home design services in Tacoma, Washington"
                fill
                sizes="100vw"
                className="object-cover"
                priority
            />

            {/* Ink wash + blueprint grid over the photo */}
            <div className="absolute inset-0 bg-ink/80 z-[5]" aria-hidden="true"></div>
            <div className="absolute inset-0 bp-grid opacity-60 z-[6]" aria-hidden="true"></div>

            {/* Content Container — in flow so the hero grows with its
                content on small screens instead of clipping it */}
            <div className="relative flex items-center justify-center z-10 min-h-[700px] py-16">
                <div className="text-center max-w-4xl px-4">
                    <Eyebrow className="mx-auto mb-6 max-w-md">
                        Sheet A-1 · Residential design &amp; drafting · Tacoma WA
                    </Eyebrow>

                    {/* Main Heading */}
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold mb-5 tracking-tight text-tone-heading">
                        A.R.Bergman{" "}
                        <span className="relative inline-block">
                            Drafting
                            <svg
                                viewBox="0 0 300 12"
                                preserveAspectRatio="none"
                                className="absolute -bottom-2 left-0 w-full h-[10px]"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4,8 Q75,3 150,7 T296,5"
                                    fill="none"
                                    stroke="#fbbf24"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    pathLength="1"
                                    className="draw"
                                />
                            </svg>
                        </span>{" "}
                        LLC
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl font-semibold mb-3 text-line">
                        Professional Architectural Drafting Services in Tacoma, WA
                    </p>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl mb-9 text-tone-body max-w-2xl mx-auto leading-relaxed">
                        Expert architectural drafting, custom home design, and construction plans for
                        Tacoma and the Pacific Northwest. Fast, friendly, and affordable drafting
                        services with 15+ years of experience.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button asChild variant="cta" size="xl" className="w-full sm:w-auto transition-all duration-300 hover:scale-105">
                            <Link href="/contact" className="flex items-center gap-3">
                                Get Started
                                <FaArrowRight className="text-sm" aria-hidden="true" />
                            </Link>
                        </Button>

                        <Button asChild variant="ctaOutline" size="xl" className="w-full sm:w-auto transition-all duration-300 hover:scale-105">
                            <Link href="/services">View Services</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
