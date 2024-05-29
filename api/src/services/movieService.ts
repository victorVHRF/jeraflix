import axios from 'axios'
import Movie from '../models/movieModel'

export async function searchMoviesService(query: string){
  const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      api_key: process.env.TMDB_API_KEY,
      query
    }
  })

  return data.results
}

export async function addMovieToWatchListService(profileId: string, movieId: string, title: string){
  const movie = new Movie({ profileId, movieId, title, watchList: true })
  await movie.save()
  return movie
}

export async function listWatchService(profileId: string){
  const movies = await Movie.find({ profileId, watchList: true })
  return movies
}

export async function markAsWatchedService(movieId: string){
  const movie = await Movie.findById(movieId)
  if(!movie){
    throw new Error('Movie not found')
  }

  movie.watched = true
  await movie.save()
  return movie
}