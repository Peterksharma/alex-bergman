import { IoHome } from "react-icons/io5";
import { FaInfoCircle, FaRegNewspaper, FaPhone } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";

export const links = [
  {
    name: "Home",
    link: "/",
    type: "button",
    variant: "ghost",
    icon: <IoHome />,
  },
  {
    name: "About",
    link: "/about",
    type: "button",
    variant: "ghost",
    icon: <FaInfoCircle />,
  },
  {
    name: "Portfolio",
    link: "/portfolio",
    type: "button",
    variant: "ghost",
    icon: <MdOutlineHomeWork />,
  },
  {
    name: "Services",
    link: "/services",
    type: "NavigationMenu",
    variant: "ghost",
    icon: <FaRegNewspaper />,
  },
  {
    name: "Testimonials",
    link: "/services",
    type: "button",
    variant: "ghost",
    icon: <FaRegNewspaper />,
  },
  {
    name: "FAQ",
    link: "/services",
    type: "button",
    variant: "ghost",
    icon: <FaRegNewspaper />,
  },
  {
    name: "Our Process",
    link: "/services",
    type: "button",
    variant: "ghost",
    icon: <FaRegNewspaper />,
  },
  {
    name: "Contact Us",
    link: "/contact",
    type: "button",
    variant: "ghost",
    icon: <FaRegNewspaper />,
  },
];
