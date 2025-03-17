"use client";

import { useSession } from "next-auth/react";
import React, { use } from "react";
import toast from "react-hot-toast";

interface Data {
  movieId: string;
}

const CollectionButton = ({ movieId }: Data) => {
  const { data: session } = useSession();
  const user = session?.user?.name;
  console.log({ user, movieId });

  const handleCollection = async () => {
    const response = await fetch("/api/v1/collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, movieId }),
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
      CollectionButton
    </button>
  );
};

export default CollectionButton;
