import AboutTrustCards from "@/components/about/AboutTrustCards";
import Staff from "@/components/about/people/Staff";
import MissionCards from "@/components/about/MissionCards";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "About Us",
  alternates: { canonical: "/about" },
  description: "Learn about A.R.Bergman Drafting, founded in 2008 in Olympia, Washington. We're committed to producing high-quality building plans at affordable rates for residential and commercial projects in Tacoma and the Pacific Northwest.",
  keywords: [
    "about A.R.Bergman Drafting",
    "architectural drafting company",
    "Tacoma drafting services",
    "Olympia Washington drafting",
    "building plans company",
    "architectural design firm"
  ],
  openGraph: {
    title: "About A.R.Bergman Drafting | Professional Drafting Services",
    description: "Founded in 2008, A.R.Bergman Drafting is committed to producing high-quality building plans at affordable rates in Tacoma, WA.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About A.R.Bergman Drafting",
    description: "Founded in 2008, A.R.Bergman Drafting is committed to producing high-quality building plans at affordable rates.",
  },
};

export default function About() {
  return (
    <div className="bg-gray-900">
      {/* Hero Header Section */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-gray-300">About</span>{" "}
              <span className="text-white">A.R.Bergman</span>
              <br />
              <span className="text-blue-400">Drafting and Design</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Founded in 2008 in Olympia, Washington, A.R.Bergman Drafting is committed to producing
              high-quality architectural drafting and building plans at affordable rates. Serving Tacoma, WA and the Pacific Northwest, we specialize in custom home design, remodels, additions, garages, ADUs, and commercial projects with over 15 years of professional drafting experience.
            </p>
            <div className="pt-2 sm:pt-4">
              <div className="h-1 w-16 sm:w-24 bg-blue-400 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="pt-8 sm:pt-12 md:pt-16">
        <Staff />
        <AboutTrustCards />
        <MissionCards />
      </div>
    </div>
  );
}