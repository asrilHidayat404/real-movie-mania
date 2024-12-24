import Header from "@/components/Header";
import Hero from "@/layouts/Hero";
import MovieList from "@/layouts/MovieList";

export default async function Home() {
  const trending = await fetch(`${process.env.TMDB_BASE_URL}/trending/movie/day?language=en-US&api_key=${process.env.TMDB_API_KEY}`)
  const trending_movie = await trending.json()

  const recommended = await fetch(`${process.env.TMDB_BASE_URL}/movie/?top_rated/page=1&api_key=${process.env.TMDB_API_KEY}`)
  const recomended_movie = await recommended.json()

  return (
    <main>
      <section id="hero">
        <Hero />
      </section>

      <section id="trending">
          <Header>
            Trending
          </Header>
          <MovieList movies={trending_movie.results} />
      </section>

      <section id="recommended">
          <Header>
            Recommended
          </Header>
          <MovieList movies={recomended_movie.results} />
      </section>
    </main>
  );
}
