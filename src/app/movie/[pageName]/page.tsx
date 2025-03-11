import Header from "@/components/Header";
import MovieLoader from "@/components/MovieLoader";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ pageName: string }> }) => {
  const { pageName } = await params;
  async function fetchMovie(pageName: string, page = 1) {
    switch (pageName) {
      case "trending":
        const trending = await fetch(
          `${process.env.TMDB_BASE_URL}/trending/movie/day?language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`
        );
        const trending_movie = await trending.json();
        return trending_movie;
      case "recommended":
        const recommended = await fetch(
          `${process.env.TMDB_BASE_URL}/discover/movie?&page=${page}&api_key=${process.env.TMDB_API_KEY}`
        );
        const recomended_movie = await recommended.json();
        return recomended_movie;
      default:
        break;
    }
  }

  const movies = await fetchMovie(pageName);
  console.log(movies.results.length);

  return (
    <main>
      <section id={pageName} className="lg:mt-20 mt-32 px-5">
        <Header>
          <span className="uppercase">{pageName}</span>
        </Header>
        <Suspense fallback={<>Loading...</>}>
          <MovieLoader movies={movies} pageName={pageName} />
        </Suspense>
      </section>
    </main>
  );
};

export default page;
