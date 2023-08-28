"use client";
import useSearchParams from "@/hooks/useSearchParams";
import Modal from "@/components/Modal";
import { FormEvent, useState } from "react";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/loadingSpinner";
import Image from "next/image";
import Switch from "@/components/Switch";
import { useParams } from "next/navigation";
import useProject from "@/hooks/useProject";

export default function AddDomainModal() {
  const { deleteByKey, has } = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPrimary, setIsPrimary] = useState(false);
  const [domain, setDomain] = useState("");
  const { id } = useParams();
  const { addDomain } = useProject();

  function close() {
    setIsPrimary(false);
    setDomain("");
    deleteByKey("domainModal");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const data = {
      domain,
      isPrimary,
    };

    setLoading(true);
    setHasError(false);
    try {
      const res = await fetch(`/api/project/${id}/domain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const { errors, data: domainFromAPI } = await res.json();

      if (errors) setHasError(true);
      else {
        addDomain(domainFromAPI);
        close();
      }
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      close={close}
      isOpen={has("domainModal")}
      className="p-0 sm:w-[400px] w-[96%]"
    >
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center justify-center space-y-3 border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-10">
          <Image
            src="/logoa.png"
            alt="AIPage.dev logo"
            width={150}
            height={150}
            draggable={false}
            className="mx-auto h-20 w-20"
          />
          <h3 className="text-lg font-semibold">Add Domain</h3>
        </div>
        <div className="bg-gray-50 p-4 border-t">
          <div className="space-y-2">
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-gray-700"
            >
              Domain
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                autoComplete="off"
                pattern="[a-z0-9]+\.[a-zA-Z]{2,}"
                className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md focus:outline-none sm:text-sm"
                placeholder="aipage.dev"
                required
              />
            </div>
          </div>
          <span className="text-[11px] text-gray-400">
            Please enter a valid domain name (e.g. aipage.dev)
          </span>

          <div className="flex items-center justify-between bg-gray-50 my-4">
            <p className="text-sm font-medium text-gray-900">Primary Domain</p>
            <Switch fn={setIsPrimary} checked={isPrimary} />
          </div>
          {hasError && (
            <div className="py-2">
              <h2 className="text-red-500 text-sm">
                There was an error adding your domain. Please try again later.
              </h2>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="light" onClick={close}>
              Cancel
            </Button>
            <Button
              className="gap-2"
              type="submit"
              disabled={loading}
              variant="default"
            >
              {loading && <LoadingSpinner className="h-4 w-4" />}
              Add Domain
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
