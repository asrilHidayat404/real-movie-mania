import getMovieDetail from '@/app/api/getMovieDetail';
import React from 'react'

interface PageProps {
  params: {
    movie: string;
  };
}

const page = async ({params}: PageProps) => {
    const movieId = (await params).movie
    console.log({apikey: process.env.TMDB_API_KEY});
    
    const response = await fetch(`${process.env.TMDB_BASE_URL}/movie/${movieId}/credits&api_key=${process.env.TMDB_API_KEY}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer 43a84b44b9e916d44359dd17e355faf5'
        }
    }
    )
    const movie = await response.json()
    console.log(movie)

    
    return (
    <div>
      {movieId}
    </div>
  )
}

export default page
