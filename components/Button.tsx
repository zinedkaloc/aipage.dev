import { cn } from "@/utils/helpers";
import { ComponentPropsWithoutRef } from "react";

export type ButtonVariant = "default" | "light" | "pill";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
}
export default function Button({
  children,
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        {
          "border-black bg-black text-white active:bg-white hover:bg-white active:text-black hover:text-black disabled:opacity-50 disabled:cursor-not-allowed":
            variant === "default",
          "border-gray-200 bg-white text-gray-500 active:border-black hover:border-black active:text-black hover:text-black disabled:opacity-50 disabled:cursor-not-allowed":
            variant === "light",
          "rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black !disabled:text-black !disabled:bg-white":
            variant === "pill",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
