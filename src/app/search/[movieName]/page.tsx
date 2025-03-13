import getSearchMovie from "@/app/api/searchMovie";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import MovieLoader from "@/components/MovieLoader";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ movieName: string }> }) => {
  const { movieName } = await params;
  const movies = await getSearchMovie(movieName);
  console.log(movies);

  return (
    <main>
      <section id="" className="lg:mt-20 mt-32 px-5">
        <Header>
          <span className="uppercase">{movieName}</span>
        </Header>
        <Suspense fallback={<Loading />}>
          <MovieLoader movies={movies} pageName={"search"} query={movieName} />
        </Suspense>
      </section>
    </main>
  );
};

export default page;
