"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Movies = {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}[];

const MovieList = ({ movies }: { movies: Movies }) => {
  const [windowState, setWindowState] = useState(5);
  // console.log(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowState(window.innerWidth < 500 ? 3 : 5);
    };

    handleResize(); // Set awal saat komponen pertama kali dimuat
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <main className="px-10">
      <Swiper
        slidesPerView={windowState}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation]}
      >
        {movies?.map((m) => {
          return (
            <SwiperSlide key={m.id} className="p-1">
              <div className="relative w-40 lg:h-64 h-32 w-fit rounded-lg overflow-hidden shadow-lg mx-auto mx-1">
                <img
                  src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
                  alt="Movie poster of a woman with curly hair surrounded by photographers"
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
};

export default MovieList;
