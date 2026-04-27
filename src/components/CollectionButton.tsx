"use client";

import { useSession } from "next-auth/react";
import React, { use } from "react";
import toast from "react-hot-toast";

interface Data {
  movieId: string;
  title: string;
  userEmail: string;
  movieImage: string
}

const CollectionButton = ({ movieId, title, userEmail, movieImage }: Data) => {

  const handleCollection = async () => {
    if(!userEmail) {
      return toast.error("Please sign in first..")
    }
    const response = await fetch("/api/v1/collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId, title, userEmail, movieImage }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status) {
      toast.success(data.message);
    }
  };
  return (
    <button
      onClick={handleCollection}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
    >
      Add To Collection
    </button>
  );
};

export default CollectionButton;
