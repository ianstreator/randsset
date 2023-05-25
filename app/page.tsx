"use client";
import Image from "next/image";

import { LegacyRef, useEffect, useRef, useState } from "react";
import { Quote, Photo, Sizes } from "@/types";

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [images, setImages] = useState<Photo[]>([]);

  const queryRef = useRef<HTMLInputElement>(null);

  const getQuotes = async () => {
    const res = await fetch("/quotes");
    const data = await res.json();
    setQuotes(data);
    console.log(data);
  };

  const getImages = async (query: any) => {
    if (query === "") return window.alert("please use a keyword");
    console.log(query);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    };

    console.log(options);
    const res = await fetch("/images", options);
    const data = await res.json();

    setImages(data);
    console.log(data);
  };

  useEffect(() => {
    console.log(quotes);
    console.log(images);
  }, [quotes, images]);

  return (
    <main className="flex flex-col items-center h-screen w-screen">
      <h1 className="text-xl flex-none font-bold w-full text-center p-2">
        ASSET MANAGER
      </h1>

      <div className="items-center relative flex w-full h-full flex-col flex-1 md:h-full md:flex-row md:justify-center">

        
        <section className="flex flex-col flex-1 w-10/12 h-min max-h-min md:w-2/5 md:h-96 m-2 bg-primaryColor shadow-lg overflow-hidden">
          <h2 className="flex-none w-full text-center font-bold bg-white text-xl shadow-md py-2">
            Quotes
          </h2>
          <div className="hide-scrollbar flex flex-col flex-1 p-2 overflow-y-scroll">
            <button
              onClick={() => getQuotes()}
              className="flex-none hover:bg-hoverColor rounded bg-secondaryColor text-white p-2 w-full"
            >
              Generate
            </button>
            <div className="p-1 flex-1 overflow-y-scroll max-h-min">
              {quotes?.length > 0 &&
                quotes.map(({ q, a }, i) => {
                  console.log(q, a);
                  return (
                    <div
                      key={i}
                      className="relative text-sm flex flex-col w-10/12 bg-white p-2 my-4 mx-auto rounded"
                    >
                      <div className="w-full">{q}</div>
                      <div className="w-fit ml-auto pt-2">{a}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>

        <section className="flex flex-col flex-1 w-10/12 h-min max-h-min md:w-2/5 md:h-96 m-2 bg-primaryColor shadow-lg overflow-hidden">
          <h2 className="w-full text-center font-bold bg-white text-xl shadow-md py-2">
            Images
          </h2>
          <div className="p-2 w-full flex flex-col flex-1 hide-scrollbar flex flex-col flex-1 p-2 overflow-y-scroll">
            <div className="relative w-full flex-none">
              <input
                placeholder="Keyword"
                className="rounded bg-white p-2 outline-none w-full"
                ref={queryRef}
                type="string"
              />
              <button
                onClick={() => getImages(queryRef.current!.value)}
                className="hover:bg-hoverColor rounded-r bg-secondaryColor text-white p-2 w-fit absolute right-0"
              >
                Search
              </button>
            </div>

            <div className="p-1 flex flex-wrap flex-1 overflow-y-scroll max-h-min">
              {images?.length > 0 &&
                images.map((photo: Photo, i) => {
                  const thumb = Object.values(photo)[0].thumb;
                  console.log(thumb);
                  return (
                    <div
                      className="rounded shadow-lg overflow-hidden w-24 h-24 relative my-4 mx-4"
                      key={i}
                    >
                      <Image src={thumb} fill alt="photo"></Image>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
