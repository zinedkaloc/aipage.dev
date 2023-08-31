import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Project } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripePrice(price: number) {
  return price / 100;
}

export function moneyFormat(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export const getSubdomain = (name: string, apexName: string) => {
  if (name === apexName) return null;
  return name.slice(0, name.length - apexName.length - 1);
};

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};

export function toReversed<T>(arr: T[]) {
  const array = [...arr];
  return array.reverse();
}

export async function updateProject(
  data: Omit<Partial<Project>, "_id">,
  id?: string,
) {
  const body = {
    ...data,
    ...(id && { _id: id }),
  };
  const res = await fetch("/api/message", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  });

  return res.json();
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isAipage(host: string) {
  const hosts = [
    "localhost",
    "localhost:3000",
    "localhost:3000",
    "ozgurozalp.test",
  ];
  return hosts.includes(host);
}
