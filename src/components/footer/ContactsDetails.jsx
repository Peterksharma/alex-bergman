import { contactData } from "@/data/global/contactInfo";

export default function ContactDetails() {
  const hrefPhone = contactData.phone.number.replace(/\D/g, '')
  return (
    <div className="flex flex-col items-center text-gray-100 mx-auto">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">

        <p className="text-gray-400 font-semibold">Phone Number:</p>
        <a className="flex gap-2" href={`tel:${hrefPhone}`}>
          <span className="flex-shrink-0">{contactData.phone.icon}</span>
          {contactData.phone.number}
        </a>

        <p className="text-gray-400 font-semibold">Email:</p>
        <a className="flex gap-2" href={`mailto:${contactData.email.address}`}>
          <span className="flex-shrink-0">{contactData.email.icon}</span>
          {contactData.email.address}
        </a>

        <p className="text-gray-400 font-semibold">Address:</p>
        <div className="flex gap-2">
          <span className="flex-shrink-0">{contactData.address.icon}</span>
          <div>
            {contactData.address.line1}
            <br />
            {contactData.address.line2}
          </div>
        </div>

      </div>
    </div>
  );
};