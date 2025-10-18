import { links } from "@/data/links"
import { contactData } from "@/data/contact"
import Link from "next/link"

//Icons
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaSquareFacebook, FaInstagram, FaLocationDot } from "react-icons/fa6";

let headerStyle = 'underline text-lg'

export default function Footer() {

    const renderLinks = (links) => {
        return links.map((link, index) => (
            <div key={index} >
                <a href={link.link}>{link.name}</a>
            </div>
        ))
    }

    const renderContact = (contactData) => {

        const hrefPhone = contactData.Phone.replace(/\D/g, '')

        return (
            <div>
                <a className="flex" href={`tel:${hrefPhone}`}><FaPhone />{contactData.Phone}</a>
                <a className="flex" href={`mailto:${contactData.email}`} ><MdEmail />{contactData.Email}</a>
                <div className="flex">
                    <FaLocationDot />
                    <div>{contactData.Address1}<br /> {contactData.Address2}</div>
                </div>
            </div>
        )
    }

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
                    <div>{renderContact(contactData)} </div>
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