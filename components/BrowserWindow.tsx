import { ReactNode } from "react";
import { cn } from "@/utils/helpers";

interface BrowserWindowProps {
  children: ReactNode;
  className?: string;
}
export default function BrowserWindow({
  children,
  className,
}: BrowserWindowProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center w-full overflow-hidden browser-window",
        className,
      )}
    >
      <div className="border flex-1 flex flex-col rounded-xl w-full overflow-hidden">
        <div className="bg-white flex items-center justify-between px-3 py-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>
        <div className="bg-red-50 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
