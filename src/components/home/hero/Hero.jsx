import { Button } from "../../ui/button"
import { FaArrowRight, FaPhone } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    let heroText = {
        main: 'A.R.Bergman Drafting LLC',
        tagline: 'Professional Architectural Drafting Services in Tacoma, WA',
        sub: 'Expert architectural drafting, custom home design, and construction plans for Tacoma and the Pacific Northwest. Fast, friendly, and affordable drafting services with 15+ years of experience.'
    }

    return (
        <div className="relative h-[700px] bg-gray-900">
            {/* Background Image */}
            <Image
                src='/assets/hero-bg.jpg'
                alt='A.R.Bergman Drafting - Professional architectural drafting and custom home design services in Tacoma, Washington'
                fill
                className="object-cover"
                priority
            />

            {/* Gradient Overlays for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-[5]"></div>

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center text-white max-w-4xl px-4">
                    {/* Main Heading */}
                    <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
                        <span className="text-white drop-shadow-2xl">{heroText.main}</span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-2xl md:text-3xl font-semibold mb-3 text-blue-400 drop-shadow-lg">
                        {heroText.tagline}
                    </p>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        {heroText.sub}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            asChild
                            className="w-full sm:w-auto h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                        >
                            <Link href="/contact" className="flex items-center gap-3">
                                Get Started
                                <FaArrowRight className="text-sm" />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="w-full sm:w-auto h-14 px-8 bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold text-lg shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <Link href="/services" className="flex items-center gap-3">
                                View Services
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                            <span className="text-blue-400 font-bold text-xl">15+</span>
                            <span>Years Experience</span>
                        </div>
                        <div className="h-6 w-px bg-gray-500"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-400 font-bold text-xl">500+</span>
                            <span>Projects Completed</span>
                        </div>
                        <div className="h-6 w-px bg-gray-500"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-400 font-bold text-xl">100%</span>
                            <span>Licensed & Insured</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}