import { CardContent } from "@/components/ui/card";
import SurfaceCard from "@/components/common/SurfaceCard";
import Reveal from "@/components/common/Reveal";
import { processBenefits } from "@/data/processBenefitsData";

export default function ProcessBenefits() {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold text-tone-heading text-center mb-12">
        Why Our Process <span className="text-tone-accent">Works</span>
      </h2>

      <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {processBenefits.map((benefit, index) => (
          <SurfaceCard key={index} className="text-center">
            <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-tone-accent mb-2">{benefit.title}</div>
              <p className="text-tone-body text-sm sm:text-base">
                {benefit.description}
              </p>
            </CardContent>
          </SurfaceCard>
        ))}
      </Reveal>
    </div>
  );
}

