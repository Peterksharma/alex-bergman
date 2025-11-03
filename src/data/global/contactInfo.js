import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {FaLocationDot } from "react-icons/fa6";

export const contactData = {
  phone: {
    number:'(888)818-7526',
    icon: <FaPhone/>
  },
  address: {
    line1: '3720 6th Ave',
    line2: 'Tacoma, WA 98406',
    icon: <FaLocationDot/>
  },
  email:{
    address: 'A.R.Bergman@gmail.com',
    icon: <MdEmail/>
  }
}