import { cookies, headers } from "next/headers";
import { Invoice, Product, Project, User } from "@/types";
import altogic from "@/utils/altogic";
import { NextResponse } from "next/server";

const isDev = process.env.NODE_ENV === "development";

export function getSessionCookie() {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");
  return token?.value;
}

export async function fetchAuthUser() {
  const token = getSessionCookie();
  if (!token) return;

  // @ts-ignore
  altogic.auth.setSession({
    token,
  });

  const { user } = await altogic.auth.getUserFromDB();
  return user as User;
}

export async function fetchProducts(): Promise<Product[]> {
  const path = process.env.NEXT_PUBLIC_GET_PRICES_PATH as string;
  const { data, errors } = await altogic.endpoint.get(path);
  if (errors) throw new Error("Failed to fetch Products");
  return data.data;
}

export async function fetchInvoices(): Promise<Invoice[]> {
  const path = process.env.NEXT_PUBLIC_GET_INVOICES_PATH as string;
  const { data } = await altogic.endpoint.get(path, undefined, {
    Session: getSessionCookie(),
  });
  return data?.data ?? [];
}

export async function updateUser(data: Partial<User>) {
  const token = getSessionCookie();
  if (!token) throw new Error("No token found");

  // @ts-ignore
  altogic.auth.setSession({
    token,
  });

  const { user, errors } = await altogic.auth.getUserFromDB();

  if (!user || errors) throw new Error("Failed to fetch User");

  return await altogic.db
    .model("users")
    .object(user?._id)
    .update(data);
}

export async function deleteUser() {
  const token = getSessionCookie();
  if (!token) throw new Error("No token found");

  // @ts-ignore
  altogic.auth.setSession({
    token,
  });

  const { user, errors } = await altogic.auth.getUserFromDB();

  if (!user || errors) throw new Error("Failed to fetch User");

  return await altogic.db
    .model("users")
    .object(user?._id)
    .delete();
}

export function logout(req: Request, nextResponse: typeof NextResponse) {
  /*altogic.auth
    .signOut(token?.value)
    .then(console.log)
    .catch(console.error);*/

  const destinationUrl = new URL("/", new URL(req.url).origin);
  const response = nextResponse.redirect(destinationUrl);
  response.cookies.delete("sessionToken");
  return response;
}

export async function fetchProjects(): Promise<Project[] | null> {
  const { data, errors } = await altogic.endpoint.get("/projects", undefined, {
    Session: getSessionCookie(),
  });
  if (errors) throw new Error("Failed to fetch Projects");
  return data.result;
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  const regex = /^[a-fA-F0-9]{24}$/g; // mongo id regex
  if (!regex.test(id)) return null;

  const { data, errors } = await altogic.endpoint.get(
    "/project/" + id,
    undefined,
    {
      Session: getSessionCookie(),
    },
  );
  if (errors) {
    console.log(JSON.stringify(errors, null, 4));
    return null;
  }
  return data as Project;
}

export async function updateProjectName(id: string, name: string) {
  const token = getSessionCookie();

  const { data: project, errors } = await altogic.endpoint.put(
    `/project/name/${id}`,
    {
      name,
    },
    undefined,
    {
      Session: getSessionCookie(),
    },
  );

  return { project, errors };
}

export async function deleteProject(id: string) {
  const { errors } = await altogic.endpoint.delete(
    `/project`,
    {
      id,
    },
    undefined,
    {
      Session: getSessionCookie(),
    },
  );

  return { errors };
}

export async function getProjectByDomain(
  domain: string,
): Promise<Project | null> {
  const { data, errors } = await altogic.endpoint.post("/project/domain", {
    domain,
  });
  if (!data || errors) return null;
  return data;
}
