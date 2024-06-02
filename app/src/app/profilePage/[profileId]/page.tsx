"use client"

import { Movies } from "@/types/movies.interface"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { addMovieToWatchlist, getProfileMovies, getTopRatedMovies, markMovieAsWatched } from "../../../../services/api"

export default function ProfilePage({ params }: { params: { profileId: string } }) {
  const { profileId } = params
  const router = useRouter()
  const [movies, setMovies] = useState<Movies[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movies[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopRatedMovies()
    fetchProfileMovies()
  }, [])

  async function fetchProfileMovies() {
    try {
      const moviesData = await getProfileMovies(profileId)
      setMovies(moviesData)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch movies:', error)
      setLoading(false)
    }
  }

  async function fetchTopRatedMovies() {
    try {
      const topRatedMoviesData = await getTopRatedMovies()
      setTopRatedMovies(topRatedMoviesData)
    } catch (error) {
      console.error('Failed to fetch top-rated movies:', error)
    }
  }

  async function handleMarkAsWatched(movieId: string, title: string) {
    try {
      await markMovieAsWatched(profileId, movieId, title)
      fetchProfileMovies()
      alert('Movie marked as watched successfully!')
    } catch (error) {
      console.error('Failed to mark movie as watched:', error)
    }
  }

  async function handleAddToWatchlist(movieId: string, title: string) {
    try {
      await addMovieToWatchlist(profileId, movieId, title)
      fetchProfileMovies()
      alert('Movie added to watchlist successfully!')
    } catch (error) {
      console.error('Failed to add movie to watchlist:', error)
      alert('Failed to add movie to watchlist. Please try again.')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Top Rated Movies:</h1>
      <ul>
        {topRatedMovies.map((movie: Movies) => (
          <li key={movie.id} className="mb-4">
            <div className="text-lg">{movie.title}</div>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleMarkAsWatched(movie.id.toString(), movie.title)}
              >
                Mark as Watched
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleAddToWatchlist(movie.id.toString(), movie.title)}
              >
                Add to Watchlist
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h1>Movies for Profile:</h1>
      <ul>
        {movies.map((movie: Movies) => (
          <li key={movie.id} className="mb-4">
            <div className="text-lg">{movie.title}</div>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleMarkAsWatched(movie.id.toString(), movie.title)}
              >
                Mark as Watched
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleAddToWatchlist(movie.id.toString(), movie.title)}
              >
                Add to Watchlist
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
