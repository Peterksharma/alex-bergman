import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRegHeart } from "react-icons/fa";

export default function MissionCards() {
    return (
        <div className="py-12 sm:py-16">
            <div className="w-full max-w-4xl mx-auto px-4">
                <Card className='bg-gradient-to-br from-gray-600 to-gray-700 shadow-xl border-0'>
                    <CardHeader className="pb-4 sm:pb-6">
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <FaRegHeart className="h-12 w-12 sm:h-16 sm:w-16 text-red-400 hover:text-pink-500 transition-all duration-300 ease-in-out hover:scale-110" />
                        </div>
                        <h2 className="text-center text-2xl sm:text-3xl text-white font-bold tracking-tight leading-none">
                            Our Mission
                        </h2>
                    </CardHeader>

                    <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8 text-center">
                        <div className="mb-4 sm:mb-6">
                            <p className="text-lg sm:text-xl text-red-300 font-semibold mb-2 sm:mb-3">
                                Our work is driven to make the world a better place
                            </p>
                            <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
                                Which is why 3% of all profits are donated to charitable
                                organizations within our community.
                            </p>
                        </div>

                        <Button
                            asChild
                            className="h-10 sm:h-12 px-6 sm:px-8 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-semibold rounded-md transition-colors shadow-lg hover:shadow-xl"
                        >
                            <a
                                href="https://www.redcross.org/donate/donation.html/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Donate to the American <span className="font-bold ml-1">Red Cross</span>
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}