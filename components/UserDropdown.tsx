"use client";
import { Gem, ReceiptIcon, Settings } from "lucide-react";
import Popover from "@/components/Popover";
import Badge from "@/components/Badge";
import { useAuth } from "@/context/AuthContext";
import IconMenu from "@/components/IconMenu";
import LogoutIcon from "@/components/LogoutIcon";
import Link from "next/link";

export default function UserDropdown() {
  const { user } = useAuth();
  return (
    <Popover
      content={
        <div className="flex w-full flex-col space-y-px rounded-md bg-white p-3 sm:w-56">
          <div className="p-2">
            {user?.name && (
              <p className="truncate text-sm font-medium text-gray-900">
                {user?.name}
              </p>
            )}
            <p className="truncate text-sm text-gray-500">{user?.email}</p>
          </div>
          <div className="w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200 flex justify-between">
            <IconMenu text="Credits" icon={<Gem className="h-4 w-4" />} />
            <Badge
              text={user?.credits.toString() as string}
              variant={user?.credits === 0 ? "red" : "yellow"}
            />
          </div>
          <Popover.Item asChild>
            <Link
              href="/profile/invoices"
              className="block !outline-none w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <IconMenu
                text="Invoices"
                icon={<ReceiptIcon className="h-4 w-4" />}
              />
            </Link>
          </Popover.Item>
          <Popover.Item asChild>
            <Link
              href="/profile/settings"
              className="block !outline-none w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <IconMenu
                text="Settings"
                icon={<Settings className="h-4 w-4" />}
              />
            </Link>
          </Popover.Item>
          <Popover.Item asChild>
            <a
              href="/api/logout"
              className="block w-full !outline-none rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <IconMenu
                text="Logout"
                icon={<LogoutIcon className="h-4 w-4" />}
              />
            </a>
          </Popover.Item>
        </div>
      }
      align="end"
    >
      <button className="group relative shrink-0 !outline-none">
        {user ? (
          <img
            alt={user?.email || "Avatar for logged in user"}
            src={
              user.profilePicture ||
              `https://avatars.dicebear.com/api/micah/${user?.email}.svg`
            }
            className="h-9 shrink-0 w-9 rounded-full border border-gray-300 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-10 sm:w-10"
          />
        ) : (
          <div className="h-9 w-9 animate-pulse rounded-full border border-gray-300 bg-gray-100 sm:h-10 sm:w-10" />
        )}
        {user?.credits === 0 && (
          <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white bg-red-500" />
        )}
      </button>
    </Popover>
  );
}
