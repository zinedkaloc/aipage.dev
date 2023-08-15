import { cn } from "@/utils/helpers";

export default function Badge({
  text,
  variant,
  className,
}: {
  text: string;
  variant?: "yellow" | "gray" | "red";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-px text-xs font-medium capitalize tabular-nums",
        {
          "border-gray-400 bg-gray-400 text-white": variant === "gray",
          "border-red-500 bg-red-500 text-white": variant === "red",
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
