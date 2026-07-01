"use client";

import { Button } from "../ui/button";
import { links } from "../../data/global/links";
import { services } from "../services/data/servicesData";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  // Escape must close the mobile drawer; the backdrop alone is mouse-only (WCAG 2.1.2)
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsServicesExpanded(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const midpoint = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, midpoint);
  const rightLinks = links.slice(midpoint);

  const renderNavigationItem = (item, index, isMobile = false) => {
    if (item.type === "NavigationMenu") {
      if (isMobile) {
        return (
          <div key={index} className="w-full">
            <button
              onClick={() => setIsServicesExpanded(!isServicesExpanded)}
              className="w-full flex items-center justify-between text-base text-gray-100 bg-transparent hover:bg-gray-700 rounded-md px-3 py-2 transition-colors"
              aria-expanded={isServicesExpanded}
              aria-controls="mobile-services-menu"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </div>
              {isServicesExpanded ? (
                <HiChevronUp size={20} />
              ) : (
                <HiChevronDown size={20} />
              )}
            </button>
            
            {isServicesExpanded && (
              <div id="mobile-services-menu" className="mt-2 ml-4 flex flex-col gap-1">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={service.url}
                    className="block select-none rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors hover:bg-gray-700 hover:text-gray-100 text-gray-100 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="block select-none rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors hover:bg-gray-700 hover:text-gray-100 text-gray-100 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Services
                </Link>
              </div>
            )}
          </div>
        );
      }

      return (
        <NavigationMenu key={index}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className="bg-transparent hover:bg-gray-700 text-gray-100 gap-2 text-lg"
              >
                {item.icon}
                {item.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-gray-800 border border-blue-900">
                <ul className="w-[250px] p-2">
                  {services.map((service) => (
                    <li key={service.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={service.url}
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors hover:bg-gray-700 hover:text-gray-100"
                        >
                          <div className="text-lg font-medium text-gray-100">
                            {service.name}
                          </div>
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2 leading-snug">
                            {service.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                  <NavigationMenuLink asChild>
                    <Link
                      href='/services'
                      className="block select-none rounded-md p-3 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors hover:bg-gray-700 hover:text-gray-100"
                    >
                      <div className="text-lg font-medium text-gray-100">
                        All Services
                      </div>
                      <p className="text-gray-400">See all the services we offer</p>
                    </Link>
                  </NavigationMenuLink>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
    }

    return (
      <Button 
        key={index} 
        asChild 
        variant={item.variant} 
        className={isMobile ? "text-base w-full justify-start text-gray-100" : "text-lg"}
      >
        <a 
          href={item.link}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {item.icon}
          {item.name}
        </a>
      </Button>
    );
  };

  return (
    <>
      <header className="h-[100px] md:h-[150px] sticky top-0 z-50 bg-gradient-to-b from-gray-800 to-gray-900 border-b-3 border-gray-700">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8 h-full px-4 md:px-8">
          <div className="hidden xl:flex gap-2 text-gray-100 justify-end items-center">
            {leftLinks.map((link, index) => renderNavigationItem(link, index))}
          </div>
          
          <div className="xl:hidden"></div>

          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/assets/logo.png"
              width={75}
              height={75}
              alt=""
              className="w-[50px] h-[50px] md:w-[75px] md:h-[75px]"
            />
            <span className="text-sm md:text-xl text-gray-100 font-[family-name:var(--font-lexend)] font-medium mt-1 md:mt-2 whitespace-nowrap">
              A.R.Bergman Drafting
            </span>
          </Link>

          <div className="hidden xl:flex gap-2 text-gray-100 justify-start items-center">
            {rightLinks.map((link, index) => renderNavigationItem(link, index))}
          </div>
          
          <div className="hidden xl:block"></div>
        </div>

        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setIsServicesExpanded(false);
          }}
          className="xl:hidden absolute top-1/2 right-4 md:right-8 -translate-y-1/2 text-gray-100 hover:text-gray-300 transition-colors p-2"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <HiX size={28} />
          ) : (
            <HiMenu size={28} />
          )}
        </button>
      </header>

      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 xl:hidden"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsServicesExpanded(false);
            }}
          />
          
          <div id="mobile-menu" className="fixed top-[100px] md:top-[150px] right-0 bottom-0 w-1/2 bg-gray-900 border-t border-l border-gray-700 z-40 xl:hidden overflow-y-auto">
            <div className="flex flex-col p-4 gap-2">
              {links.map((link, index) => (
                <div key={index}>
                  {renderNavigationItem(link, index, true)}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
