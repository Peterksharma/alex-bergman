import { renderTrustCards } from "@/lib/renderAboutTrustCards";
import { trustCardData } from "@/data/aboutTrustCards";

export default function AboutTrustCards() {
  return (
    <div className="w-full h-[35vh] bg-gray-800 pt-8 ">
      <div className="text-gray-100 text-center text-2xl font-bold pb-8">
        Our Commitment
      </div>
      <div className="flex items-center justify-center px-16">
        <div className="flex w-full gap-16">
          {renderTrustCards(trustCardData)}
        </div>
      </div>
    </div>
  );
}
