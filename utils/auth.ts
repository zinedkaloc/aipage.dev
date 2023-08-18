import { cookies } from "next/headers";
import { Product, Project, User } from "@/types";
import altogic from "@/utils/altogic";
import { NextResponse } from "next/server";

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

export async function updateUser(data: Partial<User>) {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");
  if (!token) throw new Error("No session token found");

  // @ts-ignore
  altogic.auth.setSession({
    token: token.value,
  });

  const { user, errors } = await altogic.auth.getUserFromDB();

  if (!user || errors) throw new Error("Failed to fetch User");

  return await altogic.db
    .model("users")
    .object(user?._id)
    .update(data);
}

export async function deleteUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");
  if (!token) throw new Error("No session token found");

  // @ts-ignore
  altogic.auth.setSession({
    token: token.value,
  });

  const { user, errors } = await altogic.auth.getUserFromDB();

  if (!user || errors) throw new Error("Failed to fetch User");

  return await altogic.db
    .model("users")
    .object(user?._id)
    .delete();
}

export function logout(req: Request, nextResponse: typeof NextResponse) {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");

  /*altogic.auth
    .signOut(token?.value)
    .then(console.log)
    .catch(console.error);*/

  const destinationUrl = new URL("/", new URL(req.url).origin);
  const response = nextResponse.redirect(destinationUrl, { status: 302 });
  response.cookies.delete("sessionToken");
  return response;
}

export async function fetchProjects(): Promise<Project[] | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");

  if (!token) return null;

  // @ts-ignore
  altogic.auth.setSession({
    token: token.value,
  });

  const { data, errors } = await altogic.endpoint.get("/messages");
  if (errors) throw new Error("Failed to fetch Projects");
  return data.result;
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");

  if (!token) return null;

  // @ts-ignore
  altogic.auth.setSession({
    token: token.value,
  });

  const { data, errors } = await altogic.db.model("messages").object(id).get();
  if (errors) throw new Error("Failed to fetch Project");
  return data as Project;
}
