import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  const { domain } = await req.json();

  // not required –> only for this demo to prevent removal of a few restricted domains
  if (restrictedDomains.includes(domain)) {
    return NextResponse.json({ error: "Restricted domain" }, { status: 403 });
  }

  const response = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
      method: "DELETE",
    },
  );

  const json = await response.json();
  NextResponse.json(json);
}

const restrictedDomains = ["portfolio.steventey.com", "cat.vercel.pub"];
