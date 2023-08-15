import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const destinationUrl = new URL("/", new URL(req.url).origin);
  const response = NextResponse.redirect(destinationUrl, { status: 302 });
  response.cookies.delete("sessionToken");
  return response;
}
