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
            <h1 className="text-2xl md:text-4xl text-center text-gray-100 font-bold mb-6 md:mb-8 px-4">Contact Us</h1>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6 px-4">
                <ContactForm />
                <ContactPageDetails />
            </div>
        </div>
    )
}