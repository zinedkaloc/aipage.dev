"use client";
import { ReactNode } from "react";
import ProfileMenu, { MenuItem } from "@/components/ProfileMenu";
import { useParams } from "next/navigation";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const { id } = useParams();

  const hasIdMenu: MenuItem[] = [
    {
      id: 1,
      name: "Design",
      href: `/profile/projects/${id}`,
    },
    {
      id: 2,
      name: "Domain",
      href: `/profile/projects/${id}/domains`,
    },
    {
      id: 3,
      name: "Integrations",
      href: `/profile/projects/${id}/integrations`,
    },
    {
      id: 4,
      name: "Settings",
      href: `/profile/projects/${id}/settings`,
    },
  ];
  const hasNoIdMenu: MenuItem[] = [
    {
      id: 1,
      name: "Projects",
      href: "/profile/projects",
    },
    {
      id: 2,
      name: "Invoices",
      href: "/profile/invoices",
    },
    {
      id: 3,
      name: "Settings",
      href: "/profile/settings",
    },
  ];

  return (
    <div className="pt-[72px] profile-page flex flex-col">
      <ProfileMenu menuItems={id ? hasIdMenu : hasNoIdMenu} />
      {children}
    </div>
  );
}
