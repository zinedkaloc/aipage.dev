"use client";
import AddDomainModal from "@/components/AddDomainModal";
import Button from "@/components/Button";
import DomainCard from "@/components/DomainCard";
import useSearchParams from "@/hooks/useSearchParams";
import { ReactNode } from "react";

export default function DomainLayout({ children }: { children: ReactNode }) {
  const { set } = useSearchParams();

  return (
    <>
      <AddDomainModal />
      <div className="bg-gray-50 flex-1">
        <div className="flex h-36 items-center border-b border-gray-200 bg-white">
          <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl text-gray-600">Domains</h1>
              </div>
              <Button
                onClick={() => set("domainModal", "true")}
                variant="default"
              >
                Add Domain
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 py-10">
          {children}
        </div>
      </div>
    </>
  );
}
