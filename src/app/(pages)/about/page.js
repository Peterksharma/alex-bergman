import AboutTrustCards from "@/components/about/AboutTrustCards";
import Staff from "@/components/about/people/Staff";
import MissionCards from "@/components/about/MissionCards";
import Chapter from "@/components/common/Chapter";
import SectionHeader from "@/components/common/SectionHeader";
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
    <>
      {/* Hero header + the drafter — ink chapter */}
      <Chapter tone="ink" grid>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <SectionHeader
            className="mb-0"
            eyebrow="Title block · The drafter"
            title={
              <>
                <span className="text-tone-muted">About</span>{" "}
                <span className="text-tone-heading">A.R.Bergman</span>
                <br />
                <span className="text-tone-accent">Drafting and Design</span>
              </>
            }
            subtitle="Founded in 2008 in Olympia, Washington, A.R.Bergman Drafting is committed to producing high-quality architectural drafting and building plans at affordable rates. Serving Tacoma, WA and the Pacific Northwest, we specialize in custom home design, remodels, additions, garages, ADUs, and commercial projects with over 15 years of professional drafting experience."
          />
        </div>
        <div className="pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32">
          <Staff />
        </div>
      </Chapter>

      {/* Trust + mission — paper chapter */}
      <Chapter tone="paper" grid>
        <AboutTrustCards />
        <MissionCards />
      </Chapter>
    </>
  );
}