import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import AuthModal from "@/components/AuthModal";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";
import { fetchAuthUser, fetchInvoices, fetchProducts } from "@/utils/auth";
import PricesModal from "@/components/PricesModal";
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
  const products = await fetchProducts();

  return (
    <AuthProvider user={user}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <AuthModal />
          <PricesModal products={products} />
        </body>
      </html>
    </AuthProvider>
  );
}
