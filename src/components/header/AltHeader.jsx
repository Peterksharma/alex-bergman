import { Button } from "../ui/button"
import { links } from "../../data/links"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
    // Split links into two groups
    const midpoint = Math.ceil(links.length / 2);
    const leftLinks = links.slice(0, midpoint);
    const rightLinks = links.slice(midpoint);
    
    const renderButton = (buttons) => {
        return buttons.map((button, index) => (
            <Button key={index} asChild variant={button.variant}>
                <a href={button.link}>{button.icon}{button.name}</a>
            </Button>
        ))
    }
    
    return (
        <header className="h-[150px] sticky top-0 z-50 bg-gradient-to-b from-gray-800 to-gray-900 border-b-1 border-gray-800">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8 h-full px-8">
                {/* Left Links */}
                <div className="flex gap-2 text-gray-100 justify-end">
                    {renderButton(leftLinks)}
                </div>
                
                {/* Center Logo and Text */}
                <Link href="/" className="flex flex-col items-center">
                    <Image
                        src='/assets/logo.png'
                        width={75}
                        height={75}
                        alt='Logo'
                    />
                    <span className="text-xl text-gray-100 font-[family-name:var(--font-lexend)] font-medium mt-2 whitespace-nowrap">
                        A.R.Bergman Drafting
                    </span>
                </Link>
                
                {/* Right Links */}
                <div className="flex gap-2 text-gray-100 justify-start">
                    {renderButton(rightLinks)}
                </div>
            </div>
        </header>
    )
}