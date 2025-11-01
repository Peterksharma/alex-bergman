import { PortfolioHeader, PortfolioGrid, PortfolioCTA } from "@/components/portfolio";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Portfolio",
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
        <PortfolioHeader />
        <PortfolioGrid />
        <PortfolioCTA />
      </div>
    </div>
  );
}