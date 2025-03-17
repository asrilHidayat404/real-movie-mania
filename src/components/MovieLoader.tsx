"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import parseReleaseDate from "@/utils/releaseData";

// Define a type for a single movie
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

// Define a type for the movies object
type Movies = {
  results: Movie[];
};

const MovieLoader = ({
  movies,
  pageName,
  query,
}: {
  movies: Movies;
  pageName: string;
  query?: string;
}) => {
  const [movie, setMovies] = useState<Movie[]>(movies.results);
  const [page, setPage] = useState(2); // Mulai dari halaman 2
  const [hasMore, setHasMore] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    let newUrl = "";
    if (pageName === "recommended") {
      newUrl = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?language=en-US&page=${page}&api_key=43a84b44b9e916d44359dd17e355faf5`;
    } else if (pageName === "trending") {
      newUrl = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/trending/movie/day?language=en-US&page=${page}&api_key=43a84b44b9e916d44359dd17e355faf5`;
    } else if (pageName === "search") {
      newUrl = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${query}&page=${page}&api_key=43a84b44b9e916d44359dd17e355faf5`;
    }
    setUrl(newUrl);
  }, [pageName, page, query]);
  // const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}${
  //   pageName == "recommended"
  //     ? `/discover/movie?language=en-US&page=${page}&api_key=43a84b44b9e916d44359dd17e355faf5`
  //     : `/${pageName}/movie/day?language=en-US&page=${page}&api_key=43a84b44b9e916d44359dd17e355faf5`
  // }`;

  const fetchMoreMovies = async () => {
    if (!url) return;
    const res = await fetch(url);
    const newMovies = await res.json();

    if (newMovies.results.length === 0) {
      setHasMore(false);
    } else {
      setMovies((prev: Movie[]) => {
        const allMovies = [...prev, ...newMovies.results];

        // 🔹 Hapus film yang duplikat berdasarkan ID
        const uniqueMovies = Array.from(
          new Map(allMovies.map((m) => [m.id, m])).values()
        );

        return uniqueMovies;
      });
      setPage((prev) => prev + 1);
    }
  };

  return (
    <InfiniteScroll
      dataLength={movie.length}
      next={fetchMoreMovies}
      hasMore={hasMore}
      loader={<Loading />}
    >
      <div className="w-full grid lg:grid-cols-6 md:grid-cols-6 grid-cols-3 gap-4">
        {movie &&
          movie.length &&
          movie.map((m: Movie) => {
            return (
              <div
                key={m.id}
                className="relative h-660 rounded-lg overflow-hidden shadow-lg mx-auto mx-1"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
                  alt={m.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center text-yellow-400 text-sm">
                  <img
                    src="/star.png"
                    className="lg:w-5 lg:h-5 w-2 h-2"
                    alt="..."
                  />
                  <span className="ml-1 lg:text-lg sm:text-[8px]">
                    {m.vote_average}
                  </span>
                </div>
                <div className="absolute top-2 right-2 bg-green-600 text-white lg:text-lg sm:text-[8px] px-1 rounded">
                  HD
                </div>
                <Link
                  href={`/movie-detail/${m?.id}`}
                  className="absolute bottom-0 left-0 right-0 text-center text-white text-sm bg-gray-700 bg-opacity-80 p-1"
                >
                  <span className="block">{m?.title}</span>
                  <span>({parseReleaseDate(m?.release_date).year})</span>
                </Link>
              </div>
            );
          })}
      </div>
    </InfiniteScroll>
  );
};

export default MovieLoader;
