import AboutTrustCards from "@/components/about/AboutTrustCards";
import Staff from "@/components/about/people/Staff";
import MissionCards from "@/components/about/MissionCards";

export default function About() {
  return (
    <div className="bg-gray-900">
      {/* Hero Header Section */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-gray-300">About</span>{" "}
              <span className="text-white">A.R.Bergman</span>
              <br />
              <span className="text-blue-400">Drafting and Design</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Founded in 2008 in Olympia, Washington, we're committed to producing
              high-quality building plans at affordable rates.
            </p>
            <div className="pt-4">
              <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="pt-16">

      <Staff />
      <AboutTrustCards />
      <MissionCards />
    </div>
      </div>
  );
}