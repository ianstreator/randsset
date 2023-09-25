import React from "react";
import Link from "next/link";

function StyledLink({ link }: { link: string }) {
  return (
    <Link
      className="py-1 px-2 m-1 rounded-md bg-black/20 hover:bg-secondaryColor/30 text-secondaryColor font-extralight w-fit text-start"
      href={link}
    >
      {link}
    </Link>
  );
}

export default StyledLink;
