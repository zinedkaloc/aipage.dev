import { cookies } from "next/headers";
import { Product, User } from "@/types";
import altogic from "@/utils/altogic";

export async function fetchAuthUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");
  if (!token) return null;
  // @ts-ignore
  altogic.auth.setSession({
    token: token.value,
  });

  const { user } = await altogic.auth.getUserFromDB();
  return user as User;
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, errors } = await altogic.endpoint.get("/prices");
  if (errors) throw new Error("Failed to fetch Products");
  return data.data;
}

export async function fetchInvoices() {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");
  if (!token) return null;

  const { data, errors } = await altogic.endpoint.get("/invoices");
  if (errors) throw new Error("Failed to fetch Invoices");
  return data.data;
}
