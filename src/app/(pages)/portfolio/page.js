import SectionHeader from "@/components/common/SectionHeader";
import CTASection from "@/components/common/CTASection";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Portfolio",
  alternates: { canonical: "/portfolio" },
  description: "View our portfolio of completed architectural drafting projects including custom homes, remodels, additions, garages, basements, and commercial projects in Tacoma and the Pacific Northwest.",
  keywords: [
    "A.R.Bergman Drafting portfolio",
    "architectural drafting projects",
    "custom home designs portfolio",
    "home remodel portfolio Tacoma",
    "construction projects examples",
    "architectural drawings portfolio"
  ],
  openGraph: {
    title: "Portfolio | A.R.Bergman Drafting Projects",
    description: "View our portfolio of completed architectural drafting projects including custom homes, remodels, and additions.",
    url: `${siteConfig.url}/portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | A.R.Bergman Drafting",
    description: "View our portfolio of completed architectural drafting projects.",
  },
};

export default function Portfolio() {
  return (
    <div className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={<>Our <span className="text-blue-400">Portfolio</span></>}
          subtitle="Explore our portfolio of completed architectural drafting projects in Tacoma and the Pacific Northwest. From custom homes and remodels to garages, additions, and commercial projects. Click on any card to see detailed information and project images showcasing our professional drafting expertise."
        />
        <PortfolioGrid />
        <CTASection
          boxed={false}
          actions={[{ label: "Start Your Project", href: "/contact", withArrow: true }]}
        />
      </div>
    </div>
  );
}
