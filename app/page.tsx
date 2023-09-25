import React from "react";
import Image from "next/image";

import StyledLink from "./components/StyledLink";

function page() {
  return (
    <div className="relative flex flex-col justify-center items-start p-20">
      <div className="absolute top-0 left-0">
        <Image src={"/logo.svg"} width={100} height={100} alt="logo"></Image>
      </div>

      <p className="text-center text-xl font-bold">
        Randsset is a public API that provides you with randomized quotes and
        images.
      </p>

      <div className="p-8">
        <p className="m-3">
          Check out
          <StyledLink link={"/docs"}></StyledLink>
          to see examples of API usage and info (endpoints, parameters, and
          limitations).
        </p>

        <p className="m-3">
          Check out
          <StyledLink link={"/assets"}></StyledLink>
          to see a catalog of all assets.
        </p>
      </div>
    </div>
  );
}

export default page;
