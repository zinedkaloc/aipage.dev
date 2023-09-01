import altogic from "@/utils/altogic";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");

  if (!token) {
    return NextResponse.json(
      {
        message: "You must be logged in to update your project.",
      },
      { status: 401 },
    );
  }

  const body = await req.json();
  // @ts-ignore
  altogic.auth.setSession({
    token: token.value,
  });

  const { data, errors } = await altogic.endpoint.put("/message-content", body);

  if (errors) return NextResponse.json({ errors }, { status: 500 });

  revalidatePath("/profile/projects");
  return NextResponse.json({ message: data }, { status: 200 });
}
