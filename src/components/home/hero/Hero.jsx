import { Button } from "../../ui/button"
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Background from '@/assets/hero-bg.jpg'


export default function Hero() {

    let heroText = {
        main: 'ARBergman Drafting LLC',
        sub: 'Friedly, fast and affordable contstruction documents and consulations'
    }

    return (
        <div className="relative h-[600px] bg-blue-100">
            <Image
                src={Background}
                alt='An image of houses'
                fill
                className="object-cover"

            />
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center text-white text-shadow-lg ">
                    <h1 className="text-5xl font-bold mb-4">{heroText.main}</h1>
                    <h2 className="text-xl mb-6">{heroText.sub}</h2>
                    <Button className="w-[300px] h-[75px]">
                        <a href="contact" className="flex gap-2">Contact Us for a Consultation <FaArrowRight /></a>
                    </Button>
                </div>
            </div>

        </div>
    )
}