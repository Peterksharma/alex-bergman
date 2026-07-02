import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

/**
 * Single source of truth for the business's contact details.
 * Consumed by the footer, the contact page, and the LocalBusiness
 * structured data — edit here and it updates everywhere.
 */
const street = "3720 6th Ave";
const city = "Tacoma";
const state = "WA";
const zip = "98406";

export const contactData = {
  phone: {
    number: "(888)818-7526",
    icon: <FaPhone />,
  },
  address: {
    street,
    city,
    state,
    zip,
    line1: street,
    line2: `${city}, ${state} ${zip}`,
    icon: <FaLocationDot />,
  },
  email: {
    address: "A.R.Bergman101@gmail.com",
    icon: <MdEmail />,
  },
};
