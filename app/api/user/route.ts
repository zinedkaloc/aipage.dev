import { deleteUser, logout, updateUser } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { data, errors } = await updateUser(await req.json());

  if (errors) {
    return NextResponse.json({ errors }, { status: 500 });
  }

  return NextResponse.json({ user: data }, { status: 200 });
}

export async function DELETE(req: Request) {
  const { errors } = await deleteUser();

  console.log({ errors });

  if (errors) {
    return NextResponse.json({ errors }, { status: 500 });
  }

  return logout(req, NextResponse);
}
