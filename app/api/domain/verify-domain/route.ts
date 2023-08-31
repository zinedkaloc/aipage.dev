import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  const { domain } = await req.json();

  const response = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}/verify?teamId=${process.env.TEAM_ID_VERCEL}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
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
