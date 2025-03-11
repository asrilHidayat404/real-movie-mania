import Link from "next/link";
import React from "react";

const SeeAllButton = ({ moviePageName }: { moviePageName: string }) => {
  return (
    <div className="w-full flex justify-center mt-10">
      <Link
        href={`movie/${moviePageName}`}
        className="mx-auto bg-green-600 text-gray-100 px-4 py-2 font-semibold rounded-lg"
      >
        See all
      </Link>
    </div>
  );
};

export default SeeAllButton;
