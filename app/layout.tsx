import "./globals.css";
import "@smastrom/react-rating/style.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import AuthModal from "@/components/AuthModal";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";
import { fetchAuthUser, fetchProducts } from "@/utils/auth";
import PricesModal from "@/components/PricesModal";
import Header from "@/components/Header";
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
    <AuthProvider user={user ?? null}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <AuthModal />
          <PricesModal products={products} />
        </body>
      </html>
    </AuthProvider>
  );
}
