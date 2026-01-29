import { NextResponse } from "next/server";
import journalService from "@/services/journal";
import { jwtVerify } from "jose";
const secret = new TextEncoder().encode(process.env.SECRET);

const getUserId = async (req) => {
  const token = req.cookies.get("token")?.value;
  const { payload } = await jwtVerify(token, secret);
  const userId = payload.userId * 1;
  return userId;
};
export async function GET(req, {params}) {
  try {
    const userId = await getUserId(req);
    const url = new URL(req.url);
    const {id} = params;

    const journal = await journalService.getJournalDetail({ userId, journalId: id });
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