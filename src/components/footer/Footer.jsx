import { links } from "@/data/global/links"
import ContactDetails from "@/components/footer/ContactsDetails";
import { FaSquareFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
    const iconStyle = "w-7 h-7 sm:w-8 sm:h-8 hover:text-blue-400 transition-colors duration-300"

    const renderLinks = (links) => {
        return links.map((link, index) => (
            <a
                key={index}
                href={link.link}
                className="block py-2 text-sm sm:text-base hover:text-blue-400 transition-colors duration-200"
            >
                {link.name}
            </a>
        ))
    }

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 border-t-2 border-gray-800 text-gray-100">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                    {/* Quick Links Section */}
                    <div>
                        <h2 className='text-lg sm:text-xl pb-3 sm:pb-4 font-bold text-white border-b-2 border-blue-400 inline-block mb-4 sm:mb-6'>
                            Quick Links
                        </h2>
                        <nav className="flex flex-col">
                            {renderLinks(links)}
                        </nav>
                    </div>


                    {/* About Section */}
                    <div>
                        <h2 className='text-lg sm:text-xl pb-3 sm:pb-4 font-bold text-white border-b-2 border-blue-400 inline-block mb-4 sm:mb-6'>
                            A.R.Bergman Drafting
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            Professional architectural drafting services for residential projects serving the Pacific Northwest. From custom home designs to remodels, additions, and ADUs, we provide detailed construction documents, permit packages, and expert consultations.
                        </p>
                    </div>


                    {/* Contact Section */}
                    <div>
                        <h2 className='text-lg sm:text-xl pb-3 sm:pb-4 font-bold text-white border-b-2 border-blue-400 inline-block mb-4 sm:mb-6'>
                            Contact Us
                        </h2>
                        <ContactDetails />
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
                    <a
                        href="https://www.facebook.com/arbergmanhome/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <FaSquareFacebook className={iconStyle} />
                    </a>
                    <a
                        href="https://www.instagram.com/arbergman_drafting/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <FaInstagram className={iconStyle} />
                    </a>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="bg-gray-950 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 text-center">
                    <p className="text-gray-300 mb-2 text-sm sm:text-base">
                        &copy; {new Date().getFullYear()} ARBergman Drafting LLC. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Site created by{" "}
                        <a
                            href="https://petersharma.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                            Peter Sharma
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}