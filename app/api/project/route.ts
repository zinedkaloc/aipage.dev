import { deleteProject, updateProjectName } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { name, id } = await req.json();

  try {
    const { project, errors } = await updateProjectName(id, name);

    if (errors) {
      return NextResponse.json({ errors }, { status: 500 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
