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
        <header className="h-[125px] border-b-2 sticky top-0 z-50 bg-white ">
            <div className="flex justify-between items-center p-4 pl-16 h-full" >
                <div className="flex">
                    <Link href="/" className="flex items-center">
                        <Image
                            src='/assets/logo.png'
                            width={75}
                            height={75}
                            alt='Logo'
                        />
                        <span className="pl-8 text-2xl font-[family-name:var(--font-righteous)]">A.R.Bergman Drafting LLC</span>
                    </Link>
                </div>
                <div className="flex gap-2">
                    {renderButton(links)}
                </div>
            </div>
        </header>
    )
}