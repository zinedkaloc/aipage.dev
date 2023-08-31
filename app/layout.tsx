import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import AuthModal from "@/components/AuthModal";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";
import { fetchAuthUser, fetchProducts, getProjectByDomain } from "@/utils/auth";
import PricesModal from "@/components/PricesModal";
import { headers } from "next/headers";
import { isAipage } from "@/utils/helpers";
import HTMLPreview from "@/components/HTMLPreview";
import { Project } from "@/types";
const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const isAipageDomain = isAipage(headers().get("Host") as string);
  if (!isAipageDomain) {
    const project = await getProjectByDomain(headers().get("Host") as string);
    if (project) {
      return {
        title: `Preview - ${project.name ?? project.content} | AIPage.dev`,
      };
    }
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

  return (
    <AuthProvider user={user ?? null}>
      <html lang="en">
        <body className={inter.className}>
          {isAipageDomain || !project ? (
            <>
              {children}
              <AuthModal />
              <PricesModal products={products} />
            </>
          ) : (
            <HTMLPreview html={project.result} />
          )}
        </body>
      </html>
    </AuthProvider>
  );
}
