import ContactForm from "@/components/contact/ContactForm"
import ContactPageDetails from "@/components/contact/ContactsPageDetails"

export default function Contact() {

    return (
        <div className="pt-8 pb-8 bg-gray-900">
            <h1 className="text-4xl text-center text-gray-100 font-bold mb-8">Contact Us</h1>
            <div className="max-w-8xl mx-auto flex gap-2 px-4">
                <ContactForm />
                <ContactPageDetails />
            </div>
        </div>
    )
}