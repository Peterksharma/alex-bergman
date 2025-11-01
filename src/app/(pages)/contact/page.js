import ContactForm from "@/components/contact/ContactForm"
import ContactPageDetails from "@/components/contact/ContactsPageDetails"

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with A.R.Bergman Drafting for your architectural drafting needs. Located at 3720 6th Ave, Tacoma, WA 98406. Contact us for custom home designs, remodels, additions, and construction plans.",
  keywords: [
    "contact A.R.Bergman Drafting",
    "Tacoma drafting contact",
    "architectural drafting consultation",
    "drafting services Tacoma",
    "3720 6th Ave Tacoma",
    "free consultation drafting"
  ],
  openGraph: {
    title: "Contact A.R.Bergman Drafting | Get a Free Consultation",
    description: "Contact A.R.Bergman Drafting for your architectural drafting needs. Located in Tacoma, WA. Get a free consultation for your project.",
    url: "https://www.arbergman.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact A.R.Bergman Drafting",
    description: "Get in touch for your architectural drafting needs. Free consultation available.",
  },
};

export default function Contact() {

    return (
        <div className="pt-8 pb-8 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-4xl text-center text-gray-100 font-bold mb-4">Contact Us</h1>
                    <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        Ready to start your architectural drafting project? Located in Tacoma, WA at 3720 6th Ave, we serve clients throughout the Pacific Northwest. Get in touch for a free consultation about your custom home design, remodel, addition, or commercial project. Our experienced team is here to help bring your vision to life with professional drafting services.
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6 px-4">
                <ContactForm />
                <ContactPageDetails />
            </div>
        </div>
    )
}