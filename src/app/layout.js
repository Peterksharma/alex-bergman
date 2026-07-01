import { Geist, Geist_Mono } from "next/font/google";
import { Righteous } from "next/font/google";
import { Lexend } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/AltHeader";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import StructuredData from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site";

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
  variable: "--font-lexend",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
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
    url: siteConfig.url,
    siteName: "A.R.Bergman Drafting",
    title: "A.R.Bergman Drafting | Professional Architectural Drafting Services",
    description: "Professional architectural drafting services in Tacoma, WA. Custom home designs, additions, remodels, and detailed construction plans.",
    images: [
      {
        url: `${siteConfig.url}/assets/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "A.R.Bergman Drafting — Professional Architectural Drafting Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A.R.Bergman Drafting | Professional Architectural Drafting Services",
    description: "Professional architectural drafting services in Tacoma, WA. Custom home designs, additions, remodels, and detailed construction plans.",
    images: [`${siteConfig.url}/assets/og-image.jpg`],
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
    canonical: "/",
  },
  category: "Architecture & Construction",
  icons: {
    icon: [
      { url: "/icon-logo.svg", type: "image/svg+xml" },
      { url: "/assets/logo.png", type: "image/png", sizes: "any" },
    ],
    apple: [
      { url: "/assets/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <StructuredData />
        <main id="main">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
