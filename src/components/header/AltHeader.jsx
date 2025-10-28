import { Button } from "../ui/button";
import { links } from "../../data/links";
import { services } from "../../data/services";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Header() {
  // Split links into two groups
  const midpoint = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, midpoint);
  const rightLinks = links.slice(midpoint);

  const renderNavigationItem = (item, index) => {
    if (item.type === "NavigationMenu") {
      return (
        <NavigationMenu key={index}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-gray-700 text-gray-100 gap-2 text-lg">
                {item.icon}
                {item.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className=" bg-gray-800 border  border-blue-900">
                <ul className="w-[250px] p-2">
                  {services.map((service) => (
                    <li key={service.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={service.link}
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 hover:text-gray-100"
                        >
                          <div className="text-lg font-medium text-gray-100">
                            {service.name}
                          </div>
                          <p className="text-gray-400">This name</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
    }

    // Render regular button
    return (
      <Button key={index} asChild variant={item.variant} className="text-lg">
        <a href={item.link}>
          {item.icon}
          {item.name}
        </a>
      </Button>
    );
  };

  return (
    <header className="h-[150px] sticky top-0 z-50 bg-gradient-to-b from-gray-800 to-gray-900 border-b-3 border-gray-700">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8 h-full px-8">
        <div className="flex gap-2 text-gray-100 justify-end items-center">
          {leftLinks.map((link, index) => renderNavigationItem(link, index))}
        </div>

        <Link href="/" className="flex flex-col items-center">
          <Image src="/assets/logo.png" width={75} height={75} alt="Logo" />
          <span className="text-xl text-gray-100 font-[family-name:var(--font-lexend)] font-medium mt-2 whitespace-nowrap">
            A.R.Bergman Drafting
          </span>
        </Link>

        {/* Right Links */}
        <div className="flex gap-2 text-gray-100 justify-start items-center">
          {rightLinks.map((link, index) => renderNavigationItem(link, index))}
        </div>
      </div>
    </header>
  );
}
