import { cookies } from "next/headers";
import { User } from "@/types";
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
