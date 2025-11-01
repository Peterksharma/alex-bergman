import ContactForm from "@/components/contact/ContactForm"
import ContactPageDetails from "@/components/contact/ContactsPageDetails"

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