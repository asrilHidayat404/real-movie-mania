import getMovieOfGenre from "@/app/api/movieOfGenre";
import getSearchMovie from "@/app/api/searchMovie";
import MovieDetailButton from "@/components/MovieDetailButton";
import { formatRuntime } from "@/utils/formatRuntime";
import parseReleaseDate from "@/utils/releaseData";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: Promise<{ movie: string }> }) => {
  const movieId = (await params).movie;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}?language=en-US&api_key=${process.env.TMDB_API_KEY}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 43a84b44b9e916d44359dd17e355faf5",
      },
    }
  );
  const movie = await response.json();
  const releaseDate = parseReleaseDate(movie.release_date);
  const credits = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=43a84b44b9e916d44359dd17e355faf5`
  );
  const creditsData = await credits.json();
  console.log(creditsData);

  console.log(
    creditsData.crew
      .filter(({ job }) => job === "Director")
      .map((crew: any) => crew.name)
      .join(", ")
  );

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
            alt=""
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="md:ml-8 w-full md:w-3/4 space-y-3">
          <h1 className="text-3xl font-bold">{movie.original_title}</h1>
          <p className="text-gray-300">
            {releaseDate.year} • {formatRuntime(movie.runtime)}
          </p>
          <p className="text-gray-300 text-sm italic">
            {movie.genres
              .map((genre: { id: string; name: string }) => genre.name)
              .join(", ")}
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
            Starring:{" "}
            {creditsData.cast
              .slice(0, 3)
              .map((cast: any) => cast.name)
              .join(", ") || "No cast available"}
          </p>
          <p className="text-gray-400">
            Directed by:{" "}
            {creditsData.crew
              .filter(({ job }) => job === "Director")
              .map((crew: any) => crew.name)
              .join(", ") || "No director available"}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded">
              Add to Watchlist
            </button>
            <MovieDetailButton title="Watch Trailer" id={movie.id} />
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
              Cast
            </button>
          </div>
        </div>
      </div>

      {/* Customers Also Watched Section */}
      <div className="p-2">
        <CustomersAlsoWatched genre={movie.genres[0].id} />
      </div>
      {/* <pre>{JSON.stringify(movie, undefined, 2)}</pre> */}
    </div>
  );
};

const CustomersAlsoWatched = async ({ genre }: { genre: string }) => {
  const trending_movie = await getMovieOfGenre(genre);
  console.log(trending_movie);

  type results = {
    id: string;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: string;
  };

  return (
    // make the background glass effect
    <div className="p-6 md:p-12 relative bg-gray-800 bg-opacity-50 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-100">
        Customers Also Watched
      </h2>
      <div className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-2 gap-y-8">
        {trending_movie.results.map((m: results, index: number) => (
          <div
            key={index}
            className="relative w-fit lg:h-64  bg-black rounded-lg overflow-hidden shadow-lg mx-auto h-40"
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
              className="absolute bottom-0 left-0 right-0 text-center text-white text-[10px] bg-gray-700 bg-opacity-80 p-1"
            >
              <span className="block">{m?.title}</span>
              <span>({parseReleaseDate(m?.release_date).year})</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
