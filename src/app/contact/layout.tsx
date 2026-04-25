import type { Metadata } from "next";
import FAQ from "../components/faq";


export const metadata: Metadata = {
  title: "Hairsbyama - Contact Us",
  description: "Get in touch with hairbyama for inquiries, support, or to learn more about our premium hair extensions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
        {children}
        <FAQ />
        </>
  );
}
