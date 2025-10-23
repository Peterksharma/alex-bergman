import { links } from "@/data/links"
import { renderContacts } from "@/lib/renderContacts";
import { contactData } from "@/data/contact";
//Icons
import { FaSquareFacebook, FaInstagram } from "react-icons/fa6";

let headerStyle = 'underline text-lg pb-2 font-bold'

export default function Footer() {

    const iconStyle = "w-[25px] h-[25px] hover:text-blue-500"


    const renderLinks = (links) => {
        return links.map((link, index) => (
            <div key={index}  className="text-center">
                <a href={link.link}>{link.name}</a>
            </div>
        ))
    }


    return (
        <footer className="h-[400px] bg-gray-900 border-t border-gray-800 text-gray-100" >
            <div className="grid grid-cols-3 gap-2 p-16">
                <div>
                    <h2 className='underline text-lg pb-2 font-bold'>Contact Us</h2>
                    {renderContacts(contactData)}
                </div>
                <div>
                    <h2 className='underline text-lg pb-2 font-bold text-center'> Drafting and Designs</h2>
                    <p className="text-center">
                        Professional architectural drafting services for residential projects serving the Pacific Northwest. From custom home designs to remodels, additions, and ADUs, we provide detailed construction documents, permit packages, and expert consultations. Quality drafting made accessible—fast, friendly, and affordable.</p>
                </div>
                <div>
                    <h2 className='underline text-lg pb-2 font-bold text-center'>Quick Links</h2>
                    <div className="">{renderLinks(links)}</div>
                </div>
            </div>
            <div className="flex justify-center gap-4 ">
                <FaSquareFacebook className={iconStyle} />
                <FaInstagram className={iconStyle} />
            </div>
            <div className="pt-8 text-center bg-gray-900 w-[100vw]">
                <p className="text-gray-100">&copy; {new Date().getFullYear()} ARBergman Drafting LLC. All rights reserved.</p>
                <p className="text-gray-500 py-2">Site created by <a href="https://petersharma.dev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Peter Sharma</a></p>
            </div>
        </footer>
    )
}