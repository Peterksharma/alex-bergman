import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {FaLocationDot } from "react-icons/fa6";

export const contactData = {
  phone: {
    number:'(888)818-7526',
    icon: <FaPhone/>
  },
  address: {
    line1: '123 2nd Street',
    line2: 'Tacoma, WA 55555',
    icon: <FaLocationDot/>
  },
  email:{
    address: 'A.R.Bergman@gmail.com',
    icon: <MdEmail/>
  }
}