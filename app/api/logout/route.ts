import { NextResponse } from "next/server";
import { logout } from "@/utils/auth";

export async function GET(req: Request) {
  return logout(req, NextResponse);
}
