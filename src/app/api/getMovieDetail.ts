"use server"
export default async function getMovieDetail(query: unknown) {

  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/movie/${query}/credits&api_key=${process.env.TMDB_API_KEY}`)
    const data = await response.json()
    return data
    
  } catch (error) {
    return error
  }
}