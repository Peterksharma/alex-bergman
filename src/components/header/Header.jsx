import { Button } from "../ui/button"
import { links } from "../../data/links"
import Image from "next/image"
import Link from "next/link"

export default function Header() {

    const renderButton = (buttons) => {
        return buttons.map((buttons, index) => (
            <Button key={index} asChild variant={buttons.variant}>
                <a href={buttons.link}>{buttons.icon}{buttons.name}</a>
            </Button>
        ))
    }


    return (
      <header className="h-[125px] sticky top-0 z-50 bg-gradient-to-b from-gray-800 to-gray-900 border-b-1 border-gray-800">
            <div className="flex justify-between items-center p-4 pl-16 h-full" >
                <div className="flex">
                    <Link href="/" className="flex items-center">
                        <Image
                            src='/assets/logo.png'
                            width={75}
                            height={75}
                            alt='Logo'
                        />
                        <span className="pl-8 text-2xl text-gray-100 font-[family-name:var(--font-lexend)] font-medium">A.R.Bergman Drafting</span>
                    </Link>
                </div>
                <div className="flex gap-2 text-gray-100 pr-8">
                    {renderButton(links)}
                </div>
            </div>
        </header>
    )
}