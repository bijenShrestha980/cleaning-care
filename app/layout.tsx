import type { Metadata } from "next";
import { Inter as FontInter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TanstackProvider from "@/providers/tanstack-provider";
import "./globals.css";
import "react-quill/dist/quill.snow.css";

const fontInter = FontInter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserratSans = localFont({
  src: "./fonts/Montserrat-VF.ttf",
  variable: "--font-montserrat-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});
const montserratItalic = localFont({
  src: "./fonts/Montserrat-Italic-VF.ttf",
  variable: "--font-montserrat-italic",
  weight: "100 200 300 400 500 600 700 800 900",
});
const bricolageGrotesqueSans = localFont({
  src: "./fonts/BricolageGrotesque-VF.ttf",
  variable: "--font-bricolageGrotesque-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Cleaning Care",
  description: "Caring for Cleanliness Caring for You",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <!-- Google Tag Manager -->
        <Script>
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5XRHMQ22');
        `}
        </Script>
      <!-- End Google Tag Manager -->
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-QMPK2W9W6E');
          `}
        </Script>
      </head>
      <body
        className={`${fontInter.variable} ${montserratSans.variable} ${montserratItalic.variable} ${bricolageGrotesqueSans.variable} min-h-screen bg-background antialiased`}
      >
           <!-- Google Tag Manager (noscript) -->
    <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5XRHMQ22"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->       
  <TanstackProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </TanstackProvider>
        <Toaster />
      </body>
    </html>
  );
}
