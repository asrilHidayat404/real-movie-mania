import SwiperComponents from "@/components/SwiperComponents";
import axios from "axios";

export default async function Hero() {
  const response = await fetch(
    `${process.env.TMDB_BASE_URL}/trending/movie/day?language=en-US&api_key=${process.env.TMDB_API_KEY}`
  );
  const movies = await response.json();

  return (
    <main>
      <SwiperComponents movies={movies.results} />
    </main>
  );
}
