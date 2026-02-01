import { NextResponse } from "next/server";
import journalService from "@/services/journal";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET);

const getUserId = async (req) => {
  const token = req.cookies.get("token")?.value;
  const { payload } = await jwtVerify(token, secret);
  return Number(payload.userId);
};

export async function GET(req, context) {
  try {
    const params = await context.params;
    console.log("Params received in route:", params); // Debug log
    const userId = await getUserId(req);
    const id = params.id * 1; // ← dynamic route param
    const journal = await journalService.getJournalDetail({
      userId,
      journalId: id,
    });

    return NextResponse.json(
      { message: "success", data: journal },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
}

