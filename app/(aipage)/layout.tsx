import "@smastrom/react-rating/style.css";
import { ReactNode } from "react";
import Header from "@/components/Header";

export default async function AipageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
