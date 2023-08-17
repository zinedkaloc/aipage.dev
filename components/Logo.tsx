import Link from "next/link";

interface LogoProps {
  href?: string;
}

export default function Logo({ href }: LogoProps) {
  const Component = href ? Link : "span";
  return (
    <Component
      href={href as string}
      className="flex items-center tracking-tight"
    >
      <strong className="font-bold text-xl">ai</strong>
      <span className="text-xl">page.dev</span>
    </Component>
  );
}
