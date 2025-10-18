import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export default function Trust() {

    const cardData = [
        {
            title: 'Projects',
            description: 'Our Projects',
            content: 'These are the past projects we have completed',
            button: 'See More',
            url: '/portfolio'
        },
        {
            title: 'Services',
            description: 'Our Services',
            content: 'These are the services we offer to make your projects better',
            button: 'See More',
            url: '/services'        
        },
        {
            title: 'About',
            description: 'About Us',
            content: 'See more about who we are and our mission to make your projects',
            button: 'See More',
            url: '/about'
        }
    ]

    const renderCards = (cardData) => {


        return cardData.map((cardData, index) => (
            <div key={index} className='flex-1'>
                <Card className='h-full hover:scale-102'>
                    <CardHeader className='text-center'>
                        <CardTitle>{cardData.title}</CardTitle>
                        <CardDescription>{cardData.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='text-center'>
                        <p>{cardData.content}</p>
                    </CardContent>
                    <CardFooter className='justify-center'>
                        <Button className='w-full'>{cardData.button}</Button>
                    </CardFooter>
                </Card>
            </div>
        ))
    }

    return (
        <div className="w-full h-[250px] bg-gray-100 flex items-center p-3">
            <div className='flex w-full gap-2 justify-center'>
                {renderCards(cardData)}
            </div>
        </div>
    )
}