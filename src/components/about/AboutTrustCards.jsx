import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { aboutTrustCardData } from "@/components/about/data/aboutData";

export default function AboutTrustCards() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutTrustCardData.map((cardData, index) => (
            <Card
              key={index}
              className="h-full bg-gradient-to-br from-gray-600 to-gray-700 border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <h3 className="flex items-center gap-3 text-white text-xl font-bold">
                  <span className="text-blue-400 text-2xl">{cardData.icon}</span>
                  <span>{cardData.title}</span>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200 leading-relaxed">{cardData.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};