import { Button } from "../../ui/button"
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";


export default function Hero() {

    let heroText = {
        main: 'ARBergman Drafting LLC',
        sub: 'Friendly, fast and affordable contstruction documents and consulations'
    }

    return (
        <div className="relative h-[600px] bg-blue-100 border-b-2 border-gray-700">
            <Image
                src='/assets/hero-bg.jpg'
                alt='An image of houses'
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,rgba(0,0,0,0.25)_100%)] z-[5]"></div>

                        <div className="absolute inset-0 bg-black/30 z-[5]"></div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center text-white text-shadow-lg ">
                    <h1 className="text-5xl font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,2)">{heroText.main}</h1>
                    <h2 className="text-xl mb-6 text-gray-200 font-bold">{heroText.sub}</h2>
                    <Button className="w-[300px] h-[75px]">
                        <a href="contact" className="flex gap-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0)">Contact Us for a Consultation <FaArrowRight /></a>
                    </Button>
                </div>
            </div>

        </div>
    )
}