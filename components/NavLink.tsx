"use client";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { cn } from "@/utils/helpers";

interface NavLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}
export default function NavLink({
  className,
  href,
  children,
  ...props
}: NavLinkProps) {
  const path = usePathname();
  return (
    <Link
      href={href}
      data-active={path === href}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
