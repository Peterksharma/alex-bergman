import { links } from "@/data/links"
import { renderContacts } from "@/lib/renderContacts";
import { contactData } from "@/data/contact";
//Icons
import { FaSquareFacebook, FaInstagram } from "react-icons/fa6";

let headerStyle = 'underline text-lg pb-2'

export default function Footer() {

    const iconSize = "w-[25px] h-[25px]"


    const renderLinks = (links) => {
        return links.map((link, index) => (
            <div key={index} >
                <a href={link.link}>{link.name}</a>
            </div>
        ))
    }


    return (
        <footer className="h-[300px] pl-4 bg-gray-100 border-t border-gray-400" >
            <div className="grid grid-cols-3 gap-2 p-8">
                <div>
                    <h2 className={headerStyle}>Quick Links</h2>
                    <div>{renderLinks(links)}</div>
                </div>
                <div>
                    <h2 className={headerStyle}>Contact Us</h2>
                    {renderContacts(contactData)}
                </div>
                <div>
                    <h2 className={headerStyle}> Drafting and Designs</h2>
                    <p>
                        Professional architectural drafting services for residential projects serving the Pacific Northwest. From custom home designs to remodels, additions, and ADUs, we provide detailed construction documents, permit packages, and expert consultations. Quality drafting made accessible—fast, friendly, and affordable.</p>
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <FaSquareFacebook className={iconSize} />
                <FaInstagram className={iconSize} />
            </div>
            <div className="pt-8 text-center bg-gray-100">
                <p className="text-gray-900">&copy; {new Date().getFullYear()} ARBergman Drafting LLC. All rights reserved.</p>
                <p className="text-gray-500 pt-2 pb-2">Site created by <a href="https://petersharma.dev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Peter Sharma</a></p>
            </div>
        </footer>
    )
}