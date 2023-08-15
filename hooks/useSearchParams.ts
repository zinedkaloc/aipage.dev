"use client";
import { useSearchParams as useNextSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function useSearchParams() {
  const searchParams = useNextSearchParams();
  const router = useRouter();
  const path = usePathname();

  function getURL() {
    return new URL(path, window.location.origin);
  }

  function get(key: string) {
    return searchParams.get(key);
  }

  function set(key: string, value: string) {
    const params = getURL();
    params.searchParams.set(key, value);
    router.push(params.toString());
  }

  function deleteByKey(key: string) {
    const params = getURL();
    params.searchParams.delete(key);
    router.push(params.toString());
  }

  function has(key: string) {
    return searchParams.has(key);
  }

  return {
    set,
    has,
    get,
    deleteByKey,
  };
}
