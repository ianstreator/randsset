import { NextResponse, NextRequest } from "next/server";
import { Sizes, Photo } from "@/types";

const BASE_API_URL = "https://api.unsplash.com/";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

type Unsplash = {
  results: { id: string; urls: Sizes }[];
};

export async function POST(request: Request) {
  const body = await request.json();

  const unsplashRes = await fetch(
    `${BASE_API_URL}search/photos?query=${body}&per_page=30&&client_id=${UNSPLASH_ACCESS_KEY}`
  );
  console.log(unsplashRes);
  const { results } = (await unsplashRes.json()) as Unsplash;

  console.log(results);

  const cleanedResults = results.map(({ id, urls: { thumb, full } }) => {
    // const uid = thumb.split("?")[0].split("-")[1];
    return { [id]: { thumb, full } };
    // urlsObject[id] = { thumb, full };
  });
  console.log(cleanedResults);

  return NextResponse.json(cleanedResults);
}
