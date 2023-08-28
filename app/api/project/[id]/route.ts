import { deleteProject } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { errors } = await deleteProject(params.id);

    if (errors) {
      return NextResponse.json({ errors }, { status: 500 });
    }

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
