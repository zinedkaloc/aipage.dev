import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { cookies } from "next/headers";
import AuthModal from "@/components/AuthModal";
import altogic from "@/utils/altogic";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";
import { User } from "@/types";
import { fetchAuthUser } from "@/utils/auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIPage.dev - An AI-Powered Landing Page Generator | by @zinedkaloc",
  description:
    "AI-Powered Landing Page Generator. Experience the Open Source Project that Empowers You to Build Stunning Landing Pages Instantly",
  openGraph: {
    title: "AIPage.dev - An AI-Powered Landing Page Generator | by @zinedkaloc",
    description:
      "AI-Powered Landing Page Generator. Experience the Open Source Project that Empowers You to Build Stunning Landing Pages Instantly",
    type: "website",
    url: "https://aipage.dev",
    images: `${process.env.NEXT_PUBLIC_DOMAIN}/og?text=${new Date()
      .getTime()
      .toString()}`,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await fetchAuthUser();
  return (
    <AuthProvider user={user}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <AuthModal />
        </body>
      </html>
    </AuthProvider>
  );
}
