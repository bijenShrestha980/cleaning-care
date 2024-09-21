import type { Metadata } from "next";
import { Inter as FontInter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
// import "react-quill/dist/quill.snow.css";

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
      <body
        className={`${fontInter.variable} ${montserratSans.variable} ${montserratItalic.variable} ${bricolageGrotesqueSans.variable} min-h-screen bg-background antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
