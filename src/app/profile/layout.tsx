import type { Metadata } from "next";

type LayoutProps = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Profile - Hairsbyama`,
    description: `Manage your profile and account settings with Hairsbyama. Update your personal information, change your password, and customize your preferences for a personalized shopping experience.`,
  };
}

export default function RootLayout({ children }: LayoutProps) {
  return (
         <>
          {children}
          </>
  );
}
