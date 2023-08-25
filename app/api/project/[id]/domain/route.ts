import { NextResponse } from "next/server";
import altogic from "@/utils/altogic";
import { getSessionCookie } from "@/utils/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { domain, isPrimary } = await req.json();

  // @ts-ignore
  altogic.auth.setSession({
    token: getSessionCookie() as string,
  });

  try {
    const { data, errors } = await altogic.db.model("messages.domains").append(
      {
        domain,
        isPrimary,
      },
      params.id,
    );

    if (errors) {
      return NextResponse.json({ errors }, { status: errors.status });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
