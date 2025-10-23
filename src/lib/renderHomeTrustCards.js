import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const renderTrustCards = (cardData) => {
  return cardData.map((cardData, index) => (
    <div key={index} className="flex-1 p-4">
      <Card className="h-full hover:scale-102 flex flex-col z-20 bg-gray-800 border-2 border-gray-700">
        <CardHeader className="text-center flex-shrink-0">
          <CardTitle className='text-xl text-gray-100'>{cardData.description}</CardTitle>
        </CardHeader>
        <CardContent className="text-center flex-1 overflow-auto text-gray-300">
          <p>{cardData.content}</p>
        </CardContent>
        <CardFooter className="justify-center flex-shrink-0">
          <Button className="w-full">{cardData.button}</Button>
        </CardFooter>
      </Card>
    </div>
  ));
};