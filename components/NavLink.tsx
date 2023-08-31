"use client";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { cn } from "@/utils/helpers";

interface NavLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | undefined;
}
export default function NavLink({
  className,
  href,
  children,
  target,
  ...props
}: NavLinkProps) {
  const path = usePathname();
  return (
    <Link
      href={href}
      data-active={path === href}
      className={cn(className)}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
}
