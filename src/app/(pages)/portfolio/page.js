import PortfolioCarousel from "@/components/portfolio/portfolioCarousel";

export default function Portfolio() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="p-8">
          <h1 className="text-center text-4xl font-bold"> Past Works </h1>
          <PortfolioCarousel />
        </div>
      </div>
    </div>
  );
}
