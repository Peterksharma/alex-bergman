import { renderTrustCards } from "@/lib/renderAboutTrustCards";
import { trustCardData } from "@/data/aboutTrustCards";

export default function AboutTrustCards() {
  return (
    <div className="w-full h-[35vh] bg-gray-100 flex items-center p-3">
      <div className="flex w-full gap-2 justify-center">
        {renderTrustCards(trustCardData)}
      </div>
    </div>
  );
}
