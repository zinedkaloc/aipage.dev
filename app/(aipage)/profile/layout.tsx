import { ReactNode } from "react";
import ProfileLayout from "@/components/ProfileLayout";

export default async function ProfileBaseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
