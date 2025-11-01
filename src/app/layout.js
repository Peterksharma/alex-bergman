import { Geist, Geist_Mono } from "next/font/google";
import { Righteous } from "next/font/google";
import { Lexend } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/AltHeader";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import StructuredData from "@/components/seo/StructuredData";

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

const lexend = Lexend({
  weight: ["400","900"],
  subsets: ["latin"],
  variable: "--font-righteous",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arbergman.com'),
  title: {
    default: "A.R.Bergman Drafting | Professional Architectural Drafting Services",
    template: "%s | A.R.Bergman Drafting"
  },
  description: "Professional architectural drafting services in Tacoma, WA. Custom home designs, additions, remodels, and detailed construction plans. Trusted drafting services for your building projects.",
  keywords: [
    "architectural drafting",
    "drafting services",
    "custom home design",
    "construction plans",
    "home addition plans",
    "remodel drafting",
    "Tacoma drafting",
    "Washington drafting services",
    "architectural drawings",
    "building permits"
  ],
  authors: [{ name: "Peter Sharma" }],
  creator: "Peter Sharma",
  publisher: "Aartisan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.arbergman.com",
    siteName: "A.R.Bergman Drafting",
    title: "A.R.Bergman Drafting | Professional Architectural Drafting Services",
    description: "Professional architectural drafting services in Tacoma, WA. Custom home designs, additions, remodels, and detailed construction plans.",
    images: [
      {
        url: "https://www.arbergman.com/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "A.R.Bergman Drafting Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A.R.Bergman Drafting | Professional Architectural Drafting Services",
    description: "Professional architectural drafting services in Tacoma, WA. Custom home designs, additions, remodels, and detailed construction plans.",
    images: ["https://www.arbergman.com/assets/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://www.arbergman.com",
  },
  category: "Architecture & Construction",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1f2937" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${righteous.variable} ${lexend.variable} antialiased`}
      >
       <Header/>
       <StructuredData />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
