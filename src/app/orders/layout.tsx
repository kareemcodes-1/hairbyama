import type { Metadata } from "next";


type LayoutProps = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Orders - Hairsbyama`,
    description: `View and manage your orders with Hairsbyama. Check order status, track shipments, and access order history for a seamless shopping experience.`,
  };
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <>
        {children}
    </>
  );
}
