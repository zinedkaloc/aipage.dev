import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  const { domain } = await req.json();

  const response = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains`,
    {
      body: JSON.stringify({ name: domain }),
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );

  const data = await response.json();

  if (data.error?.code == "forbidden") {
    NextResponse.json(
      {
        error: data.error,
      },
      { status: 403 },
    );
  } else if (data.error?.code == "domain_taken") {
    NextResponse.json(
      {
        error: data.error,
      },
      { status: 409 },
    );
  } else {
    NextResponse.json(
      {
        status: "ok",
      },
      { status: 200 },
    );
  }
}
