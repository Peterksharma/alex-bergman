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
      <Card className="h-full hover:scale-102">
        <CardHeader className="text-center">
          <CardTitle className='text-xl'>{cardData.description}</CardTitle>
        </CardHeader>
        <CardContent className="text-center h-[14vh]">
          <p>{cardData.content}</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button className="w-full">{cardData.button}</Button>
        </CardFooter>
      </Card>
    </div>
  ));
};
