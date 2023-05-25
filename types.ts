export type Quote = {
  q: string;
  a: string;
  c: string;
};

export type Sizes = {
  thumb: string;
  full: string;
};

export type Photo = {
  [uid: string]: { thumb: string; full: string };
};
