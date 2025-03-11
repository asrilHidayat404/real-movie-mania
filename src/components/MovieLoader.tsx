"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const MovieLoader = ({ movies, pageName }: { movies: any }) => {
  const [movie, setMovies] = useState(movies.results);
  const [page, setPage] = useState(2); // Mulai dari halaman 2
  const [hasMore, setHasMore] = useState(true);
  console.log({ movie });

  const fetchMoreMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3${
        pageName == "recommended"
          ? `/discover/movie?language=en-US&page=${page}&api_key=43a84b44b9e916d44359dd17e355faf5`
          : `/${pageName}/movie/day?language=en-US&page=${page}&api_key=43a84b44b9e916d44359dd17e355faf5`
      }`
    );
    const newMovies = await res.json();
    console.log({ newMovies });

    if (newMovies.length === 0) {
      setHasMore(false);
    } else {
      setMovies((prev: []) => {
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
  useEffect(() => {
    console.log({ movie });
  }, [movie]);
  return (
    <InfiniteScroll
      dataLength={movie.length}
      next={fetchMoreMovies}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="w-full flex flex-wrap gap-10 justify-center mt-10">
        {movie &&
          movie.length &&
          movie.map((m) => {
            console.log(m);

            return (
              <div
                key={m.id}
                className="relative w-40 lg:h-64 h-32 w-fit rounded-lg overflow-hidden shadow-lg mx-auto mx-1"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
                  alt={m.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center text-yellow-400 text-sm">
                  <img src="/star.png" className="lg:w-5 lg:h-5 w-2 h-2" />
                  <span className="ml-1 lg:text-lg sm:text-[8px]">
                    {m.vote_average}
                  </span>
                </div>
                <div className="absolute top-2 right-2 bg-green-600 text-white lg:text-lg sm:text-[8px] px-1 rounded">
                  HD
                </div>
                <Link
                  href={`/movie-detail/${m.id}`}
                  className="leading-0 absolute bottom-0 left-0 right-0 text-center text-white text-sm"
                >
                  <span className="block lg:text-lg text-[8px]">{m.title}</span>
                  <span className="lg:text-lg sm:text-[8px]">
                    {m.release_date}
                  </span>
                </Link>
              </div>
            );
          })}
      </div>
    </InfiniteScroll>
  );
};

export default MovieLoader;
