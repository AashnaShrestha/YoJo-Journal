import { NextResponse } from "next/server";
import authService from "@/services/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const user = await authService.signup(body);

    return NextResponse.json(
      { message: "success", data: user },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
