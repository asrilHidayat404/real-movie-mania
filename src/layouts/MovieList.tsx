"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

import Card from "@/components/Card";
import React from "react";
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

  return (
    <main className="px-10">
      <Swiper
        slidesPerView={6}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation]}
      >
        {movies?.map((m) => {
          return (
            <SwiperSlide key={m.id}>
              <div  className="relative w-40 h-64 bg-black rounded-lg overflow-hidden shadow-lg mx-auto">
                <img
                  src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
                  alt="Movie poster of a woman with curly hair surrounded by photographers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center text-yellow-400 text-sm">
                  <img src="/star.png" className="2-5 h-5"/>
                  <span className="ml-1">{m.vote_average}</span>
                </div>
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-1 rounded">
                  HD
                </div>
                <Link href={`/movie-detail/${m.id}`} className="absolute bottom-2 left-0 right-0 text-center text-white text-sm">
                  <span className="block">{m.title}</span>
                  <span>{m.release_date}</span>
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
