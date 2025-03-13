"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

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

const SwiperComponents = ({ movies }: { movies: Movies }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        // navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{
          delay: 10000,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {movies?.map((m) => {
          return (
            <SwiperSlide key={m.id}>
              <main
                className="flex flex-col justify-end min-h-screen text-white hero relative"
                style={{
                  backgroundImage: `url(${`https://image.tmdb.org/t/p/original${m.backdrop_path}`})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="description z-10 p-10 lg:w-2/3">
                  <h1 className="font-bold lg:text-5xl text-2xl mb-2">
                    {m.title}
                  </h1>
                  <div className="mb-2 flex items-center gap-x-5">
                    <span>{m.release_date}</span>
                    <span className="flex items-center">
                      <span>{m.vote_average}</span>
                      <img src="/star.png" className="w-5 h-5" alt="..." />
                    </span>
                  </div>
                  <p>{m.overview}</p>
                </div>
              </main>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SwiperComponents;
