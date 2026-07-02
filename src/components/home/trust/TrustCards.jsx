import IconCard from "@/components/common/IconCard";
import Reveal from "@/components/common/Reveal";
import { trustCardData } from "@/data/trustCardData";

export default function HomeTrustCards() {
  return (
    <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-16">
      {trustCardData.map((cardData) => (
        <IconCard
          key={cardData.description}
          title={cardData.description}
          body={cardData.content}
          cta={{ label: cardData.button, href: cardData.url }}
        />
      ))}
    </Reveal>
  );
}
