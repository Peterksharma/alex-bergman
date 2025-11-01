import { Card, CardContent } from "@/components/ui/card";
import { processBenefits } from "./data/processBenefitsData";

export default function ProcessBenefits() {
  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Why Our Process <span className="text-blue-400">Works</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {processBenefits.map((benefit, index) => (
          <Card key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl text-center">
            <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-2">{benefit.title}</div>
              <p className="text-gray-300 text-sm sm:text-base">
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

