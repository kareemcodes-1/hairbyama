import type { Metadata } from "next";
import FAQ from "../components/faq";


export const metadata: Metadata = {
  title: "Hairsbyama - About Us",
  description: "Learn more about hairbyama and our commitment to providing premium hair extensions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
        {children}
        </>
  );
}
