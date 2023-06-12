export type ZenQuote = {
  q: string;
  a: string;
  c: string;
};

export type QuoteAsset = {
  quote: string;
  author: string;
};

export type Quote = {
  quote: string;
  author: string;
  characters: number;
};

export type Sizes = {
  thumb: string;
  full: string;
};

export type Photo = {
  uid: string;
  thumb: string;
  full: string;
};

export type PhotoAsset = {
  uid: string;
  full: string;
};
