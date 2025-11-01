import { PortfolioHeader, PortfolioGrid, PortfolioCTA } from "@/components/portfolio";

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