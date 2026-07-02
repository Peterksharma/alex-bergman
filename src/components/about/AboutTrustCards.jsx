import IconCard from "@/components/common/IconCard";
import Reveal from "@/components/common/Reveal";
import { aboutTrustCardData } from "@/data/aboutData";

export default function AboutTrustCards() {
  return (
    <div className="pt-20 sm:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutTrustCardData.map((cardData, index) => (
            <IconCard
              key={index}
              icon={cardData.icon}
              title={cardData.title}
              body={cardData.content}
            />
          ))}
        </Reveal>
      </div>
    </div>
  );
}
