import { contactData } from "@/data/global/contactInfo";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function ContactDetails() {
  const hrefPhone = contactData.phone.number.replace(/\D/g, '')

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card className="bg-gradient-to-br from-gray-600 to-gray-700 shadow-xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-3xl text-white font-bold tracking-tight">
            Get In Touch
          </CardTitle>
          <p className="text-center text-gray-300 text-sm mt-2">
            We'd love to hear from you
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <div className="grid grid-cols-[140px_1fr] gap-x-6 gap-y-6">

            <p className="text-gray-200 font-medium text-sm">Phone Number</p>
            <a
              className="flex gap-2 items-center text-white hover:text-blue-300 transition-colors"
              href={`tel:${hrefPhone}`}
            >
              <span className="flex-shrink-0 text-blue-400">{contactData.phone.icon}</span>
              <span>{contactData.phone.number}</span>
            </a>

            <p className="text-gray-200 font-medium text-sm">Email</p>
            <a
              className="flex gap-2 items-center text-white hover:text-blue-300 transition-colors break-all"
              href={`mailto:${contactData.email.address}`}
            >
              <span className="flex-shrink-0 text-blue-400">{contactData.email.icon}</span>
              <span>{contactData.email.address}</span>
            </a>

            <p className="text-gray-200 font-medium text-sm">Address</p>
            <div className="flex gap-2 items-start text-white">
              <span className="flex-shrink-0 text-blue-400 mt-1">{contactData.address.icon}</span>
              <div className="leading-relaxed">
                {contactData.address.line1}
                <br />
                {contactData.address.line2}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};