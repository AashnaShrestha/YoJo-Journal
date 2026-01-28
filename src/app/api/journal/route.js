import { NextResponse } from "next/server";
import journalService from "@/services/journal";
import { jwtVerify } from "jose";
const secret = new TextEncoder().encode(process.env.SECRET);

export async function POST(req) {
  try {
    const body = await req.json();
    const token = req.cookies.get("token")?.value;
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId;
    const journal = await journalService.createJournal({ ...body, userId: userId * 1 });
    return NextResponse.json(
      { message: "success", data: journal },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
