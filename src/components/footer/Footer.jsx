import { links } from "@/data/links"
import { renderContacts } from "@/lib/renderContacts";
import { contactData } from "@/data/contact";
//Icons
import { FaSquareFacebook, FaInstagram} from "react-icons/fa6";

let headerStyle = 'underline text-lg'

export default function Footer() {

    const renderLinks = (links) => {
        return links.map((link, index) => (
            <div key={index} >
                <a href={link.link}>{link.name}</a>
            </div>
        ))
    }

    // const renderContact = (contactData) => {
    //     const hrefPhone = contactData.phone.number.replace(/\D/g, '')
    //     return (
    //         <div>
    //         <a className="flex gap-2" href={`tel:${hrefPhone}`}>{contactData.phone.icon}{contactData.phone.number}</a>
    //         <a className="flex gap-2" href={`mailto:${contactData.email}`} >{contactData.email.icon}{contactData.email.address}</a>
    //         <div className="flex gap-2">{contactData.address.icon}<div>{contactData.address.line1}<br />{contactData.address.line2}</div></div>
    //         </div>
    //     )
    // }

    const renderFollow = () => {

        const iconSize = "w-[25px] h-[25px]"

        return (
            <div>
                <div className="flex gap-4">
                    <FaSquareFacebook className={iconSize} />
                    <FaInstagram className={iconSize} />
                </div>
            </div>
        )
    }

    return (
        <footer className="h-[300px] pl-4" >
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
                    <p>Professional architectural drafting services for residential and commercial projects.</p>
                </div>
            </div>
            <div className="flex justify-center">
                {renderFollow()}
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                <p className="text-gray-400">&copy; {new Date().getFullYear()} ARBergman Drafting LLC. All rights reserved.</p>
                <p className="text-gray-500 mt-2">Site created by <a href="https://petersharma.dev" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Peter Sharma</a></p>
            </div>
        </footer>
    )
}