import { contactData } from "@/data/global/contactInfo";

export default function ContactDetails() {
  const hrefPhone = contactData.phone.number.replace(/\D/g, '')
  return (
    <div className="flex flex-col items-start md:items-center text-gray-100 mx-auto w-full">
      <div className="grid grid-cols-[auto_1fr] gap-x-2 sm:gap-x-4 gap-y-3 sm:gap-y-2 w-full">

        <p className="text-gray-400 font-semibold text-sm sm:text-base">Phone Number:</p>
        <a className="flex gap-2 items-center text-sm sm:text-base break-all" href={`tel:${hrefPhone}`}>
          <span className="flex-shrink-0 text-base sm:text-lg">{contactData.phone.icon}</span>
          <span className="break-words">{contactData.phone.number}</span>
        </a>

        <p className="text-gray-400 font-semibold text-sm sm:text-base">Email:</p>
        <a className="flex gap-2 items-center text-sm sm:text-base break-all" href={`mailto:${contactData.email.address}`}>
          <span className="flex-shrink-0 text-base sm:text-lg">{contactData.email.icon}</span>
          <span className="break-words">{contactData.email.address}</span>
        </a>

        <p className="text-gray-400 font-semibold text-sm sm:text-base">Address:</p>
        <div className="flex gap-2 items-start">
          <span className="flex-shrink-0 text-base sm:text-lg mt-0.5">{contactData.address.icon}</span>
          <div className="text-sm sm:text-base">
            {contactData.address.line1}
            <br />
            {contactData.address.line2}
          </div>
        </div>

      </div>
    </div>
  );
};