"use client";

import Link from "next/link";
import { cn } from "@/utils/helpers";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Settings",
    href: "/profile/settings",
  },
];

export default function ProfileMenu() {
  const path = usePathname();

  return (
    <div className="flex h-12 items-center justify-start space-x-2 overflow-x-auto scrollbar-hide px-6">
      {links.map((link) => (
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
