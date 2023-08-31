"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loadingSpinner";
import ConfiguredSection from "@/components/ConfiguredSection";
import { Domain } from "@/types";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import useProject from "@/hooks/useProject";

interface DomainCardProps {
  domain: Domain;
}

const DomainCard = ({ domain }: DomainCardProps) => {
  const removeDomainFromState = useProject((state) => state.removeDomain);
  const [domainInfo, setDomainInfo] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [removing, setRemoving] = useState(false);

  const { refresh } = useRouter();

  useEffect(() => {
    checkDomain();
    const interval = setInterval(checkDomain, 10000);
    return () => clearInterval(interval);
  }, []);

  async function checkDomain() {
    setIsValidating(true);
    const res = await fetch("/api/domain/check-domain", {
      method: "POST",
      body: JSON.stringify({ domain: domain.domain }),
    });
    const data = await res.json();
    setDomainInfo(data);
    setIsValidating(false);
  }

  async function removeDomain() {
    setRemoving(true);
    try {
      await fetch("/api/domain/remove-domain", {
        method: "POST",
        body: JSON.stringify({ domain: domain.domain }),
      });
      refresh();
      removeDomainFromState(domain._id);
    } catch {
      setRemoving(false);
    }
  }

  return (
    <div className="w-full bg-white sm:shadow-md border-y sm:border border-black sm:border-gray-50 sm:rounded-lg py-10">
      <div className="flex justify-between space-x-4 px-2 sm:px-10">
        <a
          href={`http://${domain.domain}`}
          target="_blank"
          rel="noreferrer"
          className="text-xl text-left font-semibold flex items-center"
        >
          {domain.domain}
          <span className="inline-block ml-2">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              shapeRendering="geometricPrecision"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14L21 3" />
            </svg>
          </span>
        </a>
        <div className="flex space-x-3">
          <Button onClick={checkDomain} disabled={isValidating}>
            {isValidating ? <LoadingSpinner /> : "Refresh"}
          </Button>
          <Button variant="danger" onClick={removeDomain} disabled={removing}>
            {removing ? <LoadingSpinner /> : "Remove"}
          </Button>
        </div>
      </div>

      <ConfiguredSection domainInfo={domainInfo} />
    </div>
  );
};

export default DomainCard;
