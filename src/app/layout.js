import { Bricolage_Grotesque, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import Header from "@/components/header/AltHeader";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import StructuredData from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site";

/*
 * Three-role type system ("Drafted" design language):
 *   display — Bricolage Grotesque: headlines, big stats, card titles
 *   body    — Public Sans: everything readable
 *   mono    — IBM Plex Mono: the annotation voice (eyebrows, labels, dims)
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

/*
 * Root title and description target the site's top Search Console query
 * ("architectural drafting services", position 10, zero clicks) plus
 * both cities, and end in a concrete offer. Title 54 chars, description
 * 155; the OG/Twitter copy is the same description without the phone
 * number, which social cards cannot dial.
 */
const rootTitle = "Architectural Drafting Services | Tacoma & Seattle, WA";
const rootDescription =
  "Permit-ready architectural drafting services in Tacoma and Seattle, WA: custom homes, remodels, additions and ADUs. Free consultation: call (888) 818-7526.";
const socialDescription =
  "Permit-ready architectural drafting services in Tacoma and Seattle, WA: custom homes, remodels, additions and ADUs. Free consultation.";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: rootTitle,
    template: "%s | A.R.Bergman Drafting"
  },
  description: rootDescription,
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
    siteName: siteConfig.name,
    title: rootTitle,
    description: socialDescription,
    images: [
      {
        url: `${siteConfig.url}/assets/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "A.R.Bergman Drafting — Architectural Drafting Services, Tacoma & Seattle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: rootTitle,
    description: socialDescription,
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
  themeColor: "#101a26",
};

/*
 * GA4 measurement ID. Public by design (it ships in the HTML), so the
 * production ID lives here as the default; NEXT_PUBLIC_GA_ID overrides
 * it, and non-production builds send nothing.
 */
const gaId =
  process.env.NEXT_PUBLIC_GA_ID ??
  (process.env.NODE_ENV === "production" ? "G-38FQF6QFXK" : undefined);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${publicSans.variable} ${plexMono.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-amber-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to main content
        </a>
        <Header />
        <StructuredData />
        <main id="main">{children}</main>
        <Toaster />
        <Footer />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
