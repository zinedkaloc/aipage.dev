import { NextResponse } from "next/server";
import altogic from "@/utils/altogic";
import { getSessionCookie } from "@/utils/auth";

export async function POST(req: Request) {
  const { domain } = await req.json();

  console.log({ domain });

  const response = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${domain}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN_VERCEL}`,
      },
      method: "DELETE",
    },
  );

  const json = await response.json();

  console.log(JSON.stringify(json, null, 2));
  console.log("-----");

  // @ts-ignore
  altogic.auth.setSession({
    token: getSessionCookie() as string,
  });

  const { errors } = await altogic.db
    .model("messages.domains")
    .filter(`domain == '${domain}'`)
    .delete();

  console.log(JSON.stringify(errors, null, 2));

  if (errors) {
    return NextResponse.json(errors, { status: errors.status });
  }

  NextResponse.json(json);
}
