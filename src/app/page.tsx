import Header from "@/components/Header";
import SeeAllButton from "@/components/SeeAllButton";
import Hero from "@/layouts/Hero";
import { lazy, Suspense } from "react";

const ListMovie = lazy(() => import("@/layouts/MovieList"));

export default async function Home() {
  const trending = await fetch(
    `${process.env.TMDB_BASE_URL}/trending/movie/day?language=en-US&api_key=${process.env.TMDB_API_KEY}`
  );
  const trending_movie = await trending.json();

  const recommended = await fetch(
    `${process.env.TMDB_BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}`
  );
  const recomended_movie = await recommended.json();

  return (
    <main>
      <section id="hero">
        <Hero />
      </section>

      <section id="trending">
        <Header>Trending</Header>
        <Suspense fallback={<>Loading...</>}>
          <ListMovie movies={trending_movie.results} />
        </Suspense>
        <SeeAllButton moviePageName="trending" />
      </section>

      <section id="recommended">
        <Header>Recommended</Header>
        <Suspense fallback={<>Loading...</>}>
          <ListMovie movies={recomended_movie.results} />
        </Suspense>
      </section>
      <SeeAllButton moviePageName="recommended" />
    </main>
  );
}
