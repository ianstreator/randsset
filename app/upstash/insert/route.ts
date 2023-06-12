import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.quote) {
    console.log("INSERTING QUOTE");
  }
  if (body.full) {
    console.log("INSERTING PHOTO");
  }

  console.log(body);

  return NextResponse.json(body);
}
