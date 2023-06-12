import { describe, expect, jest, test } from "@jest/globals";
import { MAX_ALLOWED_CHARACTERS, getQuotesController, isRelevantQuote, zenQuoteToQuote } from "./route";
import { Quote, ZenQuote } from "@/types";

const validQuote: Quote = {
  author: "ian",
  quote: "hello world",
  characters: MAX_ALLOWED_CHARACTERS,
};

describe("zenQuoteToQuote", () => {
  test("should map properly", () => {
    expect(zenQuoteToQuote({ a: "ian", q: "hello world", c: "90" })).toEqual({
      author: "ian",
      quote: "hello world",
      characters: 90,
    });
  });
});

describe("isRelevantQuote", () => {
  test("quotes above 69 characters should be irrelevant", () => {
    expect(isRelevantQuote(validQuote)).toBeTruthy();
  });
  test("unknown authors should be irrelevant", () => {
    expect(isRelevantQuote({ ...validQuote, author: "unknown123" })).toBeFalsy();
  });
  test("steve harvey authors should be irrelevant", () => {
    expect(
      isRelevantQuote({ ...validQuote, author: "steve harvey" })
    ).toBeFalsy();
  });
  test("quotes above 69 characters should be irrelevant", () => {
    expect(isRelevantQuote({ ...validQuote, characters: MAX_ALLOWED_CHARACTERS+1 })).toBeFalsy();
  });
});

describe("getQuotesController", () => {
  test("should respond with empty quotes when receive empty quotes from zenquote", async () => {
    const zenQuoteFetcher = (): Promise<ZenQuote[]> => Promise.resolve([]);

    const results = await getQuotesController({ zenQuoteFetcher });

    expect(results).toEqual([])
  });
  test("should filter and map properly", async () => {
    const zenQuoteFetcher = (): Promise<ZenQuote[]> => {
      return Promise.resolve([
        {a: "ian", q: "testing", c: "70"},
        {a: "ian", q: "testing", c: "71"},
        {a: "unknown", q: "testing", c: "70"},
        {a: "steve harvey", q: "testing", c: "70"},
      ]);
    }

    const results = await getQuotesController({ zenQuoteFetcher })

    expect(results).toEqual([
      {author: "ian", quote: "testing"},
    ])
  });
});

