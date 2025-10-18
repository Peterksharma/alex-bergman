import { Button } from "../ui/button"
import { links } from "../../data/links"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/logo.png"

export default function Header() {

    const renderButton = (buttons) => {
        return buttons.map((buttons, index) => (
            <Button key={index} asChild variant={buttons.variant}>
                <a href={buttons.link}>{buttons.icon}{buttons.name}</a>
            </Button>
        ))
    }


    return (
        <header className="h-[100px] border-b-2">
            <div className="flex justify-between items-center p-4">
                <Link href="/">
                <Image
                    src={Logo} 
                    width={75}
                    heigh={75}
                    alt='Logo'
                />
                </Link>
                <div className="flex gap-2">
                    {renderButton(links)}
                </div>
            </div>
        </header>
    )
}