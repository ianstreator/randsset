import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if(body.quote) {
    
  }

  console.log(body);

  return NextResponse.json(body);
}
