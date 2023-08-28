"use client";

import Button from "@/components/Button";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import LoadingSpinner from "@/components/loadingSpinner";
import { useAuth } from "@/context/AuthContext";

export default function DeleteAccountConfirmDialog() {
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuth();

  async function deleteAccountHandler() {
    setDeleting(true);
    const res = await fetch("/api/user", {
      method: "DELETE",
    });
    if (res.ok && res.redirected) {
      window.location.href = res.url;
    } else {
      setDeleting(false);
    }
  }

  return (
    <ConfirmDialog
      text="confirm delete account"
      trigger={
        <Button variant="danger" disabled={deleting} type="button">
          {deleting && <LoadingSpinner />}
          <p>Delete Account</p>
        </Button>
      }
      onConfirm={deleteAccountHandler}
    >
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
        Warning: This will permanently delete your account and all your data.
      </p>
    </ConfirmDialog>
  );
}
