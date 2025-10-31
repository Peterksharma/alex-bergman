import { expertiseCardData } from "./data/expertiseData";
import { Card, CardHeader, CardContent } from "../ui/card";

export default function RenderExpertiseCards() {
    return (
        <div className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold pb-8 text-gray-100 "> Our Expertise </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {expertiseCardData.map((data, index) => (
                    <div key={index} className="pb-4">
                        <Card className="bg-gray-500 text-gray-100 border-gray-700 border-2">
                            <CardHeader className='font-bold'>{data.title}</CardHeader>
                            <CardContent>{data.content}</CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}