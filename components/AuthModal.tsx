"use client";
import { useState } from "react";
import Link from "next/link";
import altogic from "@/utils/altogic";
import useSearchParams from "@/hooks/useSearchParams";
import Image from "next/image";
import Modal from "@/components/Modal";
import LoadingSpinner from "@/components/loadingSpinner";
import Button, { ButtonVariant } from "@/components/Button";

export default function AuthModal() {
  const { deleteByKey, has } = useSearchParams();

  const [selected, setSelected] = useState<number>();

  const loginMethods = [
    {
      name: "Google",
      variant: "default",
      icon: GoogleIcon,
      handler: () => altogic.auth.signInWithProvider("google"),
    },
    {
      name: "Github",
      variant: "light",
      icon: GithubIcon,
      handler: () => altogic.auth.signInWithProvider("github"),
    },
  ];

  function close() {
    deleteByKey("authModal");
  }

  return (
    <Modal close={close} isOpen={has("authModal")} className="p-0">
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-10">
        <Link href="/">
          <Image
            src="/logoa.png"
            alt="AIPage.dev logo"
            width={150}
            height={150}
            draggable={false}
            className="mx-auto h-24 w-24"
          />
        </Link>
        <h3 className="text-xl font-semibold">Sign in to AIPage</h3>
        <p className="text-sm text-gray-500">
          Powered by AI, Perfected for You
        </p>
      </div>
      <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-10">
        {loginMethods.map((method, index) => (
          <Button
            key={method.name}
            variant={method.variant as ButtonVariant}
            // this is a hack to prevent the button from being clicked twice
            disabled={selected !== undefined}
            onClick={() => {
              setSelected(index);
              method.handler();
            }}
            className="h-10"
          >
            {index === selected ? (
              <LoadingSpinner className="h-4 w-4" />
            ) : (
              <method.icon />
            )}
            <p>Continue with {method.name}</p>
          </Button>
        ))}
        <p className="text-center text-sm text-gray-500">
          Enterprise login?{" "}
          <a
            target="_blank"
            className="font-semibold text-gray-500 transition-colors hover:text-black"
            href="mailto:deniz@altogic.com"
          >
            Contact
          </a>
        </p>
      </div>
    </Modal>
  );
}

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
  </svg>
);

const GithubIcon = () => (
  <svg aria-label="github" viewBox="0 0 14 14" className="h-4 w-4">
    <path
      d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);
