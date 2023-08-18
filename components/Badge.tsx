import { cn } from "@/utils/helpers";

export type BadgeVariant = "yellow" | "gray" | "red" | "black" | "green";

export default function Badge({
  text,
  variant,
  className,
}: {
  text: string;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-px text-xs font-medium capitalize tabular-nums",
        {
          "border-gray-400 bg-gray-400 text-white": variant === "gray",
          "border-red-500 bg-red-500 text-white": variant === "red",
          "border-green-500 bg-green-500 text-white": variant === "green",
          "border-black bg-black text-white": variant === "black",
          "border-yellow-400 bg-yellow-400 text-stone-700":
            variant === "yellow",
        },
        className,
      )}
    >
      {text}
    </span>
  );
}
