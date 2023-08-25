import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import altogic from "@/utils/altogic";

export async function POST(req: Request) {
  const { priceId } = await req.json();
  const cookieStore = cookies();
  const session = cookieStore.get("sessionToken");

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to purchase this product" },
      { status: 401 },
    );
  }

  // @ts-ignore
  altogic.auth.setSession({
    token: session.value,
  });

  const path = process.env.NEXT_PUBLIC_CREATE_SESSION_PATH as string;
  const { errors, data } = await altogic.endpoint.post(path, {
    priceId,
  });

  if (errors) {
    return NextResponse.json({ errors }, { status: errors.status });
  }

  return NextResponse.json({ url: data.url });
}
