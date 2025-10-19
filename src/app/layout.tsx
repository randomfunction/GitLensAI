'use client';

import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Raleway} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body
        className={`${raleway.variable} antialiased ${isHomePage ? '' : 'pt-20'}`}
      >
        <Navbar isHomePage={isHomePage} />
        {children}
      </body>
    </html>
  );
}