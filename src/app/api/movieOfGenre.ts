export default async function getMovieOfGenre(genre: unknown) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=43a84b44b9e916d44359dd17e355faf5&with_genres=${genre}&certification_country=US&certification.lte=G&sort_by=popularity.desc&page=1`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
