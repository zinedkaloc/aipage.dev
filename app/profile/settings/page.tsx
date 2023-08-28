"use client";
import { useAuth } from "@/context/AuthContext";
import { useState, FormEvent } from "react";
import LoadingSpinner from "@/components/loadingSpinner";
import Button from "@/components/Button";
import { cn } from "@/utils/helpers";
import DeleteAccountConfirmDialog from "@/components/DeleteAccountConfirmDialog";
import NavLink from "@/components/NavLink";

export default function ProfileSettings() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name);
  const [loading, setLoading] = useState(false);

  async function onNameFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name || name === user?.name) return;
    setLoading(true);
    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const { user: userFromAPI, errors } = await res.json();
    setLoading(false);
    if (!errors) {
      setUser(userFromAPI);
    }
  }

  return (
    <div className="w-full max-w-screen-xl p-6 grid items-start gap-5 md:grid-cols-5">
      <div className="flex gap-1 md:grid">
        <NavLink
          className={cn(
            "rounded-md p-2.5 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200 font-semibold text-black",
            "data-[active]:bg-gray-100 data-[active]:active:bg-gray-200",
          )}
          href="/profile/settings"
        >
          General
        </NavLink>
      </div>
      <div className="grid gap-5 md:col-span-4">
        <form
          className="rounded-lg border border-gray-200 bg-white"
          onSubmit={onNameFormSubmit}
        >
          <div className="relative flex flex-col space-y-6 p-5 sm:p-10">
            <div className="flex flex-col space-y-3">
              <h2 className="text-xl font-medium">Your Name</h2>
              <p className="text-sm text-gray-500">
                This will be your display name on AIPage.dev
              </p>
            </div>
            <input
              name="name"
              placeholder="Steve Jobs"
              maxLength={32}
              type="text"
              required
              className="w-full max-w-md rounded-md border border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between rounded-b-lg border-t border-gray-200 bg-gray-50 p-3">
            <p className="text-sm text-gray-500">Max 32 characters.</p>
            <div>
              <Button
                disabled={name === user?.name}
                type="submit"
                variant="default"
              >
                {loading && <LoadingSpinner />}
                <p>Save Changes</p>
              </Button>
            </div>
          </div>
        </form>
        <div className="rounded-lg border border-red-600 bg-white">
          <div className="flex flex-col space-y-3 p-5 sm:p-10">
            <h2 className="text-xl font-medium">Delete Account</h2>
            <p className="text-sm text-gray-500">
              Permanently delete your AIPage.dev account and all of your data.
              This action cannot be undone - please proceed with caution.
            </p>
          </div>
          <div className="border-b border-red-600" />
          <div className="flex items-center justify-end p-3">
            <div>
              <DeleteAccountConfirmDialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
