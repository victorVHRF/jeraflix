import axios from 'axios'
import { ObjectId } from 'mongodb'
import { Movie } from '../models/movieModel'

export async function searchMoviesService(query: string){
  const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      api_key: process.env.TMDB_API_KEY,
      query
    }
  })

  return data.results
}

export async function addMovieToWatchlistService(profileId: string, movieId: string, title: string) {
  let movie = await Movie.findOne({ profileId: new ObjectId(profileId), movieId })

  if (!movie) {
    movie = new Movie({
      profileId: new ObjectId(profileId),
      movieId,
      title,
      watched: false,
      watchlist: true
    })
  } else {
    movie.watchlist = true
  }

  await movie.save()
  return movie
}

export async function listWatchService(profileId: string){
  const movies = await Movie.find({ profileId, watchList: true })
  return movies
}

export async function markAsWatchedService(profileId: string, movieId: string, title: string) {
  let movie = await Movie.findOne({ profileId: new ObjectId(profileId), movieId })

  if (!movie) {
    movie = new Movie({
      profileId: new ObjectId(profileId),
      movieId,
      title,
      watched: true,
      watchList: false
    })
  } else {
    movie.watched = true
  }

  await movie.save()
  return movie
}

export async function getTopRatedMoviesService(){
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  })

  return data.results
}