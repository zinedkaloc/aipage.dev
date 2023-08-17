"use client";

import Link from "next/link";
import { cn } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const links = [
  {
    id: 1,
    name: "Projects",
    href: "/profile/projects",
  },
  {
    id: 2,
    name: "Settings",
    href: "/profile/settings",
  },
];

const mails = [
  "ozgurozalp1999@gmail.com",
  "mail@ozgurozalp.com",
  "denizlevregi7@gmail.com",
];

export default function ProfileMenu() {
  const path = usePathname();
  const { user } = useAuth();

  return (
    <div className="flex border-b h-12 items-center justify-start space-x-2 overflow-x-auto scrollbar-hide px-6">
      {links
        .filter(
          (link) => mails.includes(user?.email as string) || link.id !== 1,
        )
        .map((link) => (
          <Link
            className={cn(
              "border-b-2 p-1 border-transparent text-black",
              path === link.href && "border-black",
            )}
            href={link.href}
            key={link.href}
          >
            <div className="rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
              <p className="text-sm">{link.name}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
