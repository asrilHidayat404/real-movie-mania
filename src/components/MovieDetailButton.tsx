"use client";
import { X } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

const MovieDetailButton = ({ title, id }: { title: string; id: string }) => {
  const [trailers, setTrailers] = useState<[]>([]);
  const [trailerVideo, setTrailerVideo] = useState<string | null>("");
  const getTrailer = (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=43a84b44b9e916d44359dd17e355faf5&append_to_response=videos`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => setTrailers(result.videos.results));
  };
  useEffect(() => {
    const trailer = trailers.filter(
      (item) =>
        item.type === "Trailer" &&
        (item.name.includes("Teaser Trailer") ||
          item.name.includes("Official Trailer") ||
          item.name.includes("Official Teaser Trailer") ||
          item.name.includes("Official Teaser") ||
          item.name.includes("Main Trailer"))
    );

    // const sortedTrailers = [...trailers].sort(
    //   (a, b) =>
    //     new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    // );

    const latestTrailer: { key: string } = trailer[0]; // Mengambil data terbaru

    console.log("Trailer terbaru:", latestTrailer);

    if (latestTrailer) {
      setTrailerVideo(latestTrailer?.key);
    } else {
      setTrailerVideo(null);
      if (trailerVideo == null) {
        toast.error("Trailer not found");
      }
    }
  }, [trailers]);

  return (
    <main className="">
      <button
        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
        onClick={() => getTrailer(id)}
      >
        {title}
      </button>
      {trailerVideo ? (
        <div className="p-20 mx-auto lg:w-full w-full fixed inset-0 flex justify-center items-center">
          <div className="lg:h-full md:h-full h-1/2 w-full relative">
            <iframe
              src={`https://www.youtube.com/embed/${trailerVideo}?autoplay=1`}
              // frameBorder="0"
              className="w-full h-full border-4 border-white rounded-md relative"
            ></iframe>
            <button
              className="absolute -right-3 -top-3 rounded-full bg-gray-100 p-2 text-black hover:bg-red-500 hover:text-white"
              onClick={() => setTrailerVideo("")}
            >
              <X />
            </button>
          </div>
        </div>
      ) : (
        <Toaster position="bottom-left" />
      )}
    </main>
  );
};

export default MovieDetailButton;
