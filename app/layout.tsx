import type { Metadata, Viewport } from "next";
import { Inter as FontInter } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TanstackProvider from "@/providers/tanstack-provider";
import { SITE } from "@/lib/seo/config";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/seo/schema";
import { getBusinessInfo } from "@/lib/seo/business";
import "./globals.css";
import "react-quill/dist/quill.snow.css";

const fontInter = FontInter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const montserratSans = localFont({
  src: "./fonts/Montserrat-VF.ttf",
  variable: "--font-montserrat-sans",
  weight: "100 200 300 400 500 600 700 800 900",
  display: "swap",
});
const montserratItalic = localFont({
  src: "./fonts/Montserrat-Italic-VF.ttf",
  variable: "--font-montserrat-italic",
  weight: "100 200 300 400 500 600 700 800 900",
  display: "swap",
});
const bricolageGrotesqueSans = localFont({
  src: "./fonts/BricolageGrotesque-VF.ttf",
  variable: "--font-bricolageGrotesque-sans",
  weight: "100 200 300 400 500 600 700 800 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  keywords: [...SITE.defaultKeywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.legalName,
  category: "Cleaning Services",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.defaultLocale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: ["/opengraph-image"],
    creator: SITE.twitter,
    site: SITE.twitter,
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
    shortcut: "/icon",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const business = await getBusinessInfo();
  return (
    <html lang="en-AU">
      <body
        className={`${fontInter.variable} ${montserratSans.variable} ${montserratItalic.variable} ${bricolageGrotesqueSans.variable} min-h-screen bg-background antialiased`}
      >
        <TanstackProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </TanstackProvider>
        <Toaster />
        <JsonLd
          data={[
            websiteSchema(),
            organizationSchema(business),
            localBusinessSchema(business),
          ]}
        />
      </body>
    </html>
  );
}
