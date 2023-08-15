import altogic from "@/utils/altogic";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const accessToken = url.searchParams.get("access_token") as string;
  const status = url.searchParams.get("status");
  const isOk = status === "200";

  const destinationUrl = new URL("/", new URL(req.url).origin);
  const response = NextResponse.redirect(destinationUrl, { status: 302 });

  if (!isOk) return response;

  const { session, errors } = await altogic.auth.getAuthGrant(accessToken);

  if (errors) {
    // TODO: handle errors;
  }

  if (session) {
    response.cookies.set("sessionToken", session.token, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  }

  return response;
}
