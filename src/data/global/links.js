import { IoHome } from "react-icons/io5";
import { FaInfoCircle, FaRegNewspaper, FaPhone, FaQuestionCircle } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import { RiLoopLeftFill } from "react-icons/ri";


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
    icon: <VscOpenPreview />,
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
    link: "/testimonials",
    type: "button",
    variant: "ghost",
    icon: <MdOutlineRateReview/>,
  },
  {
    name: "FAQ",
    link: "/faq",
    type: "button",
    variant: "ghost",
    icon: <FaQuestionCircle />,
  },
  {
    name: "Our Process",
    link: "/process",
    type: "button",
    variant: "ghost",
    icon: <RiLoopLeftFill/>,
  },
  {
    name: "Contact Us",
    link: "/contact",
    type: "button",
    variant: "ghost",
    icon: <FaPhone />,
  },
];
