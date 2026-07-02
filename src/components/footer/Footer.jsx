import { links } from "@/data/global/links";
import ContactDetails from "@/components/common/ContactDetails";
import Eyebrow from "@/components/common/Eyebrow";
import { FaSquareFacebook, FaInstagram } from "react-icons/fa6";

/*
 * Footer — the site's title block. On a drawing sheet the title block
 * carries the drawn-by line, sheet metadata, and issue notes; here it
 * carries navigation, the firm blurb, and contact details, closed by
 * a mono metadata strip.
 */
export default function Footer() {
    const iconStyle = "w-7 h-7 sm:w-8 sm:h-8 hover:text-tone-accent transition-colors duration-300";

    const renderLinks = (links) => {
        return links.map((link, index) => (
            <a
                key={index}
                href={link.link}
                className="block py-2 text-sm sm:text-base hover:text-tone-accent transition-colors duration-200"
            >
                {link.name}
            </a>
        ));
    };

    return (
        <footer className="bg-ink bp-grid border-t border-tone-line/25 text-tone-body">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                    {/* Quick Links Section */}
                    <div>
                        <Eyebrow rules={false} className="mb-4 sm:mb-6">Quick Links</Eyebrow>
                        <nav className="flex flex-col">
                            {renderLinks(links)}
                        </nav>
                    </div>

                    {/* About Section */}
                    <div>
                        <Eyebrow rules={false} className="mb-4 sm:mb-6">A.R.Bergman Drafting</Eyebrow>
                        <p className="text-tone-body leading-relaxed text-sm sm:text-base">
                            Professional architectural drafting services for residential projects across Tacoma, Seattle, and the greater Puget Sound. From custom home designs to remodels, additions, and ADUs, we provide detailed construction documents, permit packages, and expert consultations.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <Eyebrow rules={false} className="mb-4 sm:mb-6">Contact Us</Eyebrow>
                        <ContactDetails />
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-tone-line/20">
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

            {/* Title block strip */}
            <div className="border-t border-tone-line/25 bg-ink">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-widest text-tone-muted text-center">
                    <p>
                        Drawn by A.R.Bergman Drafting LLC · &copy; {new Date().getFullYear()} · All rights reserved
                    </p>
                    <p>
                        Site by{" "}
                        <a
                            href="https://petersharma.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-tone-accent hover:text-amber-300 transition-colors"
                        >
                            Peter Sharma
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
