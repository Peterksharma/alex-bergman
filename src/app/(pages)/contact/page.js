import ContactForm from "@/components/contact/ContactForm"
import ContactInfo from "@/components/contact/ContactInfo"

export default function Contact() {
    
    return (
        <div className="pt-8 pb-8">
            <h1 className="text-4xl text-center">Contact Us</h1>
            <div className="w-[95vw] flex gap-4 p-4">
        <ContactForm />
        <ContactInfo />
            </div>
        </div>
    )
}