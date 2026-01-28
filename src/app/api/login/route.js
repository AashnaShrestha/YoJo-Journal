import { NextResponse } from "next/server";
import authService from "@/services/auth";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const user = await authService.login(body);

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET,
      { expiresIn: "7d" },
    );

    const response = NextResponse.json(
      { message: "success", data: { ...user, token } },
      { status: 200 },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
