import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AIPage.dev - An AI-Powered Landing Page Generator | by @zinedkaloc",
  description:
    "AI-Powered Landing Page Generator. Experience the Open Source Project that Empowers You to Build Stunning Landing Pages Instantly",
  openGraph: {
    title: "AIPage.dev - An AI-Powered Landing Page Generator | by @zinedkaloc",
    description:
      "AI-Powered Landing Page Generator. Experience the Open Source Project that Empowers You to Build Stunning Landing Pages Instantly",
    type: "website",
    url: "https://aipage.dev",
    image: "https://aipage.dev/og-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
