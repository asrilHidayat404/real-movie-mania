"use server"
export default async function getSearchMovie(query: unknown) {
    
    if (typeof query !== 'string' || query.length < 3) {
      return "too short"
    }
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`)
    const data = await response.json()
    return data
    
  } catch (error) {
    return error
  }
}