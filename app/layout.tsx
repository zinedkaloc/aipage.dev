import AuthModal from "@/components/AuthModal";
import PricesModal from "@/components/PricesModal";
import { AuthProvider } from "@/context/AuthContext";
import { Project } from "@/types";
import { fetchAuthUser, fetchProducts, getProjectByDomain } from "@/utils/auth";
import { isAipage } from "@/utils/helpers";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { ReactNode } from "react";
import "../styles/globals.css";
const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const isAipageDomain = isAipage(headers().get("Host") as string);
  if (!isAipageDomain) {
    const project = await getProjectByDomain(headers().get("Host") as string);
    if (project) return {};
  }

  return {
    title: "AIPage.dev - An AI-Powered Landing Page Generator | by @zinedkaloc",
    description:
      "AI-Powered Landing Page Generator. Experience the Open Source Project that Empowers You to Build Stunning Landing Pages Instantly",
    openGraph: {
      title:
        "AIPage.dev - An AI-Powered Landing Page Generator | by @zinedkaloc",
      description:
        "AI-Powered Landing Page Generator. Experience the Open Source Project that Empowers You to Build Stunning Landing Pages Instantly",
      type: "website",
      url: "https://aipage.dev",
      images: `${process.env.NEXT_PUBLIC_DOMAIN}/api/og?text=${new Date()
        .getTime()
        .toString()}`,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isAipageDomain = isAipage(headers().get("Host") as string);
  const user = await fetchAuthUser();
  const products = await fetchProducts();
  let project: Project | null = null;

  if (!isAipageDomain) {
    project = await getProjectByDomain(headers().get("Host") as string);
  }

  if (!isAipageDomain && project?.result) {
    return require("html-react-parser")(project?.result);
  }

  return (
    <AuthProvider user={user ?? null}>
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
