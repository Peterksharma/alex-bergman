import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const renderTrustCards = (cardData) => {
  return cardData.map((cardData, index) => (
    <div key={index} className="flex-1">
      <Card className="h-full hover:scale-102">
        <CardHeader>
          <CardTitle className="flex gap-2">
            {cardData.icon}
            {cardData.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{cardData.content}</p>
        </CardContent>
      </Card>
    </div>
  ));
};
