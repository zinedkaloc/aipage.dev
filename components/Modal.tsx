import { XIcon } from "lucide-react";
import { MouseEvent, ReactNode, useRef } from "react";
import { cn } from "@/utils/helpers";

interface ModalProps {
  close: () => void;
  isOpen: boolean;
  className?: string;
  children: ReactNode;
}
export default function Modal({
  close,
  children,
  isOpen,
  className,
}: ModalProps) {
  const modalWrapper = useRef<HTMLDivElement>(null);
  function modalWrapperClickHandler(event: MouseEvent) {
    if (!modalWrapper.current || event.target !== modalWrapper.current) return;
    close();
  }

  if (!isOpen) return null;
  return (
    <div
      ref={modalWrapper}
      className="fixed modal inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={modalWrapperClickHandler}
    >
      <div
        className={cn(
          "relative overflow-auto max-h-full bg-white w-full sm:w-[400px] border border-gray-100 rounded-2xl shadow-xl p-4",
          className,
        )}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors focus:outline-none"
          onClick={close}
        >
          <XIcon />
        </button>
        {children}
      </div>
    </div>
  );
}
