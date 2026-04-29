import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
// @ts-ignore
import "./globals.css";
import Footer from "./components/footer";
import CTA from "./components/cta";
import Navbar from "./components/navbar";
import { cn } from "@/lib/utils";
import ToastProvider from "./providers/toast-provider";
import AuthProvider from "./providers/provider";
import PageLoader from "@/components/loading";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hairsbyama - Premium Hair Extensions",
  description: "Discover our collection of premium hair extensions designed for natural looks, durability, and everyday confidence. Shop now for the perfect addition to your style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <PageLoader /> 
      <AuthProvider>
      <ToastProvider />
      <Navbar />
        {children}
          <CTA />
          <Footer />
    </AuthProvider>
      </body>
    </html>
  );
}
