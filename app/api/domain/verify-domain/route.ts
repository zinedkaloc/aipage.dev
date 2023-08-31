import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { domain } = await req.json();

  const response = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}/verify`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN_VERCEL}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );

  const data = await response.json();
  return NextResponse.json(data, {
    status: response.status,
  });
}
