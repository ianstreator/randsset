import { NextResponse } from "next/server";
import { Quote } from "@/types";

const BASE_API_URL = "https://zenquotes.io/api/quotes";


export async function GET() {
  const quotesRes = await fetch(BASE_API_URL);
  const results = (await quotesRes.json()) as Quote[];
  console.log(results);

  const filteredQuotes = results
    .filter(({ q, a, c }: Quote) => {
      if (a !== "Unknown" && a !== "Steve Harvey" && parseInt(c) < 70) {
        return { q, a } as Quote;
      }
    })
    .map(({ q, a, c }: Quote) => {
      return { q, a } as Quote;
    });

  console.log(filteredQuotes);

  return NextResponse.json(filteredQuotes);
}
