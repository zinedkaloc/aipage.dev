"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/AlertDialog";
import Button from "@/components/Button";
import { XIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ReactNode, useState } from "react";

interface ConfirmDialogProps {
  text: string;
  trigger: ReactNode;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  trigger,
  text,
  onConfirm,
}: ConfirmDialogProps) {
  const { user } = useAuth();
  const [confirmText, setConfirmText] = useState("");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="overflow-hidden gap-0 w-[95%] max-w-[450px] p-0 border border-gray-100 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center justify-center relative space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-8">
          <AlertDialogCancel className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors focus:outline-none">
            <XIcon />
          </AlertDialogCancel>
          <img
            alt={user?.email || "Avatar for logged in user"}
            src={
              user?.profilePicture ||
              `https://avatars.dicebear.com/api/micah/${user?.email}.svg`
            }
            className="h-20 shrink-0 w-20 rounded-full border border-gray-300 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-20 sm:w-20"
          />
          <h3 className="text-lg font-medium">Delete Account</h3>
          <p className="text-center text-sm text-gray-500">
            Warning: This will permanently delete your account and all your
            data.
          </p>
        </div>

        <form className="flex flex-col space-y-6 bg-gray-50 px-4 py-8 text-left sm:px-8">
          <div>
            <label
              htmlFor="verification"
              className="block text-sm text-gray-700"
            >
              To verify, type{" "}
              <span className="font-semibold text-black">{text}</span> below
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                name="verification"
                id="verification"
                pattern="confirm delete account"
                required
                autoFocus={false}
                autoComplete="off"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="block w-full rounded-md border-gray-300 pr-10 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              />
            </div>
          </div>

          <AlertDialogAction asChild>
            <Button
              disabled={confirmText !== text}
              variant="danger"
              onClick={() => onConfirm()}
            >
              Confirm delete account
            </Button>
          </AlertDialogAction>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
