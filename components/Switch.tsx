"use client";

import { Dispatch, SetStateAction } from "react";
// @ts-ignore
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/utils/helpers";

const Switch = ({
  fn,
  checked = false,
  disabled = false,
}: {
  fn: Dispatch<SetStateAction<boolean>> | (() => void);
  checked?: boolean;
  disabled?: boolean;
}) => {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      name="switch"
      onCheckedChange={(checked: boolean) => fn(checked)}
      disabled={disabled}
      className={cn(
        disabled
          ? "cursor-not-allowed data-[state=checked]:bg-gray-300"
          : "cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-200",
        `relative inline-flex h-4 w-8 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`,
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "data-[state=unchecked]:translate-x-0",
          `pointer-events-none h-3 w-3 translate-x-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`,
        )}
      />
    </SwitchPrimitive.Root>
  );
};

export default Switch;
