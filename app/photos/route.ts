import { NextResponse } from "next/server";
import { Photo, Sizes } from "@/types";

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
  const { results } = (await unsplashRes.json()) as Unsplash;

  const photos: Photo[] = results.map(
    ({ id: uid, urls: { thumb, small, regular, full } }) => {
      return { uid, thumb, small, regular, full };
    }
  );

  return NextResponse.json(photos);
}
