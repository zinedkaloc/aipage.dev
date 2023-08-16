import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ReactNode } from "react";

export default function Popover({
  children,
  content,
  align = "center",
}: {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
}) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content
        sideOffset={8}
        align={align}
        className="z-50 hidden animate-slide-up-fade items-center rounded-md border border-gray-200 bg-white drop-shadow-lg md:block"
      >
        {content}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
}
