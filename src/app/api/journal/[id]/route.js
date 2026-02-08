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
    const userId = await getUserId(req);
    const id = params.id * 1;
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

export async function PATCH(req) {
  try {
    const body = await req.json();
    const userId = await getUserId(req);
    const journal = await journalService.updateJournal({ ...body, userId });
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

export async function DELETE(req, context) {
  try {
    const params = await context.params;
    const userId = await getUserId(req);
    const id = params.id * 1;
    const journal = await journalService.deleteJournal({
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