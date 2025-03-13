import Header from "@/components/Header";
import Loading from "@/components/Loading";
import MovieLoader from "@/components/MovieLoader";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ pageName: string }> }) => {
  const { pageName } = await params;
  async function fetchMovie(pageName: string, page = 1) {
    switch (pageName) {
      case "trending":
        const trending = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/trending/movie/day?language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`
        );
        const trending_movie = await trending.json();
        return trending_movie;
      case "recommended":
        const recommended = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?&page=${page}&api_key=${process.env.TMDB_API_KEY}`
        );
        const recomended_movie = await recommended.json();
        return recomended_movie;
      default:
        break;
    }
  }

  const movies = await fetchMovie(pageName);

  return (
    <main>
      <section id={pageName} className=" mt-20 px-5">
        <Header>
          <span className="uppercase">{pageName}</span>
        </Header>
        <Suspense fallback={<Loading />}>
          <MovieLoader movies={movies} pageName={pageName} />
        </Suspense>
      </section>
    </main>
  );
};

export default page;
