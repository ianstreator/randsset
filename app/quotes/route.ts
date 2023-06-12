import { NextResponse } from "next/server";
import { Quote, QuoteAsset, ZenQuote } from "@/types";

const BASE_API_URL = "https://zenquotes.io/api/quotes";
export const MAX_ALLOWED_CHARACTERS = 70

export const zenQuoteToQuote = ({
  q: quote,
  a: author,
  c: characters,
}: ZenQuote): Quote => ({
  quote,
  author,
  characters: parseInt(characters),
});

export const isRelevantQuote = ({ author, characters }: Quote) => {
  const authorLower = author.toLowerCase();

  return (
    authorLower !== "" &&
    !authorLower.includes("unknown") &&
    !authorLower.includes("steve harvey") &&
    characters <= MAX_ALLOWED_CHARACTERS
  );
};

async function defaultZenQuoteFetcher() {
  const res = await fetch(BASE_API_URL);
  const json = (await res.json()) as ZenQuote[]
  return json;
}

type getQuotesControllerProps = {
  zenQuoteFetcher?: typeof defaultZenQuoteFetcher;
};

export const getQuotesController = async ({
  zenQuoteFetcher = defaultZenQuoteFetcher,
}: getQuotesControllerProps = {}): Promise<QuoteAsset[]> => {
  const zenQuotes = await zenQuoteFetcher();

  const quotes = zenQuotes.map(zenQuoteToQuote);

  return quotes.filter(isRelevantQuote).map(({ quote, author }) => {
    return { quote, author };
  });
};

export async function GET() {
  const response = await getQuotesController();

  return NextResponse.json(response);
}
