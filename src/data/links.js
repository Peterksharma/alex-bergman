import { IoHome } from "react-icons/io5";
import { FaInfoCircle, FaRegNewspaper, FaPhone  } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";


   export const links = [
        {
        name: 'Home',
        link: '/',
        variant: 'ghost',
        icon: <IoHome />
        },
        {
        name: 'Portfolio',
        link: '/portfolio',
        variant: 'ghost',
        icon: < MdOutlineHomeWork />
        },
        {
        name: 'About',
        link: '/about',
        variant: 'ghost',
        icon:  <FaInfoCircle />
        },
        {
        name: 'Services',
        link: '/services',
        variant: 'ghost',
        icon: <FaRegNewspaper/>
        },
        {
        name: 'Contact',
        link: '/contact',
        variant: 'cta',
        icon: <FaPhone />
        },
    ]