export default function PortfolioHeader() {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
        Our <span className="text-blue-400">Portfolio</span>
      </h1>
      <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full mb-6"></div>
      <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
        Explore our collection of completed projects. Click on any card to see detailed information and additional images.
      </p>
    </div>
  );
}

