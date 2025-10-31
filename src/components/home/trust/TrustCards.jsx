import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trustCardData } from "@/components/home/trust/data/trustCardData";
import Link from "next/link";

export default function HomeTrustCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-16">
      {trustCardData.map((cardData, index) => (
        <Card
          key={index}
          className="h-full flex flex-col bg-gradient-to-br from-gray-600 to-gray-700 border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <CardHeader className="text-center flex-shrink-0 pb-4">
            <CardTitle className='text-2xl font-bold text-white tracking-tight'>
              {cardData.description}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center flex-1 px-6">
            <p className="text-gray-200 leading-relaxed text-base">
              {cardData.content}
            </p>
          </CardContent>

          <CardFooter className="justify-center flex-shrink-0 pt-6 pb-6">
            <Button
              asChild
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors shadow-lg"
            >
              <Link href={cardData.url}>
                {cardData.button}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};