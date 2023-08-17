import { cn } from "@/utils/helpers";
import { ComponentPropsWithoutRef } from "react";
import * as React from "react";
export type ButtonVariant = "default" | "light" | "pill" | "danger";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none px-4 py-1.5 ",
        {
          "border-black bg-black text-white active:bg-white enabled:hover:bg-white active:text-black enabled:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed":
            variant === "default",
          "border-gray-200 bg-white text-gray-500 active:border-black enabled:hover:border-black active:text-black enabled:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed":
            variant === "light",
          "rounded-full border border-black bg-black text-sm text-white transition-all enabled:hover:bg-white enabled:hover:text-black !disabled:text-black !disabled:bg-white":
            variant === "pill",
          "flex items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none border-red-500 bg-red-500 text-white enabled:hover:bg-white enabled:hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed":
            variant === "danger",
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

export default Button;
