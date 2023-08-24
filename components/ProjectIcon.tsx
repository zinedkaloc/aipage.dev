import { cn } from "@/utils/helpers";

export default function ProjectIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      viewBox="0 0 200 150"
      className={cn(className)}
    >
      <rect
        x="10"
        y="10"
        width="180"
        height="130"
        rx="10"
        ry="10"
        fill="#F0F0F0"
        stroke="#CCCCCC"
      />

      <rect
        x="10"
        y="10"
        width="180"
        height="30"
        rx="10"
        ry="10"
        fill="#f0f0f0"
      />

      <circle cx="25" cy="25" r="4" fill="#FF605C" />
      <circle cx="40" cy="25" r="4" fill="#FFBD44" />
      <circle cx="55" cy="25" r="4" fill="#28CA41" />

      <rect
        x="20"
        y="50"
        width="160"
        height="30"
        rx="10"
        ry="10"
        fill="#FFFFFF"
      />
      <rect
        x="25"
        y="58"
        width="120"
        rx="5"
        ry="5"
        height="14"
        fill="#F0F0F0"
      />

      <rect x="20" y="90" width="50" rx="10" ry="10" height="40" fill="#ddd" />
      <rect x="75" y="90" width="50" rx="10" ry="10" height="40" fill="#ddd" />
      <rect x="130" y="90" width="50" rx="5" ry="10" height="40" fill="#ddd" />

      <circle cx="165" cy="64" r="8" fill="#F0F0F0" />
    </svg>
  );
}
