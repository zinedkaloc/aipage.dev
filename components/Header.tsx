"use client";
import useSearchParams from "@/hooks/useSearchParams";
import { useAuth } from "@/context/AuthContext";
import UserDropdown from "@/components/UserDropdown";
import Logo from "@/components/Logo";
import { cn } from "@/utils/helpers";
import Button from "@/components/Button";

export default function Header() {
  const { set } = useSearchParams();
  const { user } = useAuth();

  function openAuthModal() {
    set("authModal", "true");
  }

  function openPricesModal() {
    set("pricesModal", "true");
  }

  return (
    <header className="w-full px-6 py-4 absolute top-0">
      <div className="flex justify-between items-center h-10">
        <Logo href="/" />
        <div
          className={`flex items-center justify-center gap-3 sm:gap-4 ${
            user ? "flex-row-reverse" : ""
          }`}
        >
          {user ? (
            <UserDropdown />
          ) : (
            <div>
              <button
                className="auth-btn rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                onClick={openAuthModal}
              >
                Log in
              </button>
              <button
                className="auth-btn rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={openAuthModal}
              >
                Sign Up
              </button>
            </div>
          )}
          <a
            href="https://twitter.com/aipagedev"
            className="flex items-center text-gray-900 hover:text-blue-500 transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="mr-1 h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          {user && (
            <Button
              className="auth-btn"
              variant="pill"
              onClick={openPricesModal}
            >
              Buy Credits 🎉
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
