import { Geist, Geist_Mono } from "next/font/google";
import { Righteous } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
});

export const metadata = {
  title: "A.R.Bergman Drafting",
  description: "Drafting your plans for the future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${righteous.variable} antialiased`}
      >
       <Header/>

        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
