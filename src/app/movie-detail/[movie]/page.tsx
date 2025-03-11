import getSearchMovie from "@/app/api/searchMovie";
import { formatRuntime } from "@/utils/formatRuntime";
import parseReleaseDate from "@/utils/releaseData";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: Promise<{ movie: string }> }) => {
  const movieId = (await params).movie;

  const response = await fetch(
    `${process.env.TMDB_BASE_URL}/movie/${movieId}?language=en-US&api_key=${process.env.TMDB_API_KEY}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 43a84b44b9e916d44359dd17e355faf5",
      },
    }
  );
  const movie = await response.json();
  console.log(movie);
  const releaseDate = parseReleaseDate(movie.release_date);

  return (
    <div
      className="relative bg-cover bg-center py-20"
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : "linear-gradient(to right, #000000, #1a1a1a)",
        backgroundSize: "cover",
      }} // Ganti dengan path gambar asli
    >
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col md:flex-row p-6 md:p-12 text-white">
        {/* Movie Poster */}
        <div className="w-full md:w-1/4">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="Frozen Movie Poster"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="md:ml-8 w-full md:w-3/4">
          <h1 className="text-3xl font-bold">{movie.original_title}</h1>
          <p className="text-gray-300">
            {releaseDate.year} • {formatRuntime(movie.runtime)}
          </p>

          {/* Ratings */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 text-xl">★★★★★</span>
            <span className="ml-2 text-gray-300">(5206)</span>
            <span className="ml-4 bg-yellow-600 px-2 py-1 rounded text-black text-sm">
              IMDb 7.9/10
            </span>
          </div>

          {/* Movie Description */}
          <p className="mt-4 text-gray-200">{movie.overview}</p>
          <p className="mt-2 text-gray-400">
            Starring: Kristen Bell, Idina Menzel, Jonathan Groff
          </p>
          <p className="text-gray-400">Directed by: Chris Buck, Jennifer Lee</p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded">
              Resume
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
              Remove from Watchlist
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
              Watch Trailer
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
              More Ways to Watch
            </button>
          </div>
        </div>
      </div>

      {/* Customers Also Watched Section */}
      <div className="p-10">
        <CustomersAlsoWatched />
      </div>
      {/* <pre>{JSON.stringify(movie, undefined, 2)}</pre> */}
    </div>
  );
};

const CustomersAlsoWatched = async () => {
  const trending_movie = await getSearchMovie("sonic");
  type results = {
    id: string;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: string;
  };

  return (
    <div className="p-6 md:p-12 z-10 relative bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Customers Also Watched</h2>
      <div className="flex flex-wrap gap-4 ">
        {trending_movie.results.map((m: results, index: number) => (
          <div
            key={index}
            className="relative w-40 lg:h-64 h-44 w-fit bg-black rounded-lg overflow-hidden shadow-lg mx-auto mx-1"
          >
            {m?.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/original${m?.poster_path}`}
                alt="Movie poster of a woman with curly hair surrounded by photographers"
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute top-2 left-2 flex items-center text-yellow-400 text-sm">
              <img src="/star.png" className="2-5 h-5" />
              <span className="ml-1">{m?.vote_average}</span>
            </div>
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-1 rounded">
              HD
            </div>
            <Link
              href={`/movie-detail/${m?.id}`}
              className="absolute bottom-2 left-0 right-0 text-center text-white text-sm"
            >
              <span className="block">{m?.title}</span>
              <span>{m?.release_date}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
