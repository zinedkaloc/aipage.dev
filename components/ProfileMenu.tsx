"use client";

import { cn } from "@/utils/helpers";
import { useAuth } from "@/context/AuthContext";
import NavLink from "@/components/NavLink";

const mails = [
  "ozgurozalp1999@gmail.com",
  "mail@ozgurozalp.com",
  "denizlevregi7@gmail.com",
];

export interface MenuItem {
  id: number;
  name: string;
  href: string;
}

interface ProfileMenuProps {
  menuItems: MenuItem[];
  className?: string;
}

export default function ProfileMenu({
  menuItems,
  className,
}: ProfileMenuProps) {
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "flex border-b h-12 items-center justify-start space-x-2 overflow-x-auto scrollbar-hide px-6",
        className,
      )}
    >
      {menuItems
        .filter(
          (link) =>
            mails.includes(user?.email as string) || link.name !== "Projects",
        )
        .map((link) => (
          <NavLink
            className={cn(
              "border-b-2 p-1 border-transparent text-black",
              "data-[active=true]:border-black",
            )}
            href={link.href}
            key={link.href}
          >
            <div className="rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
              <p className="text-sm">{link.name}</p>
            </div>
          </NavLink>
        ))}
    </div>
  );
}
