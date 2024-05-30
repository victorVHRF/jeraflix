"use client"

import { Movies } from "@/types/movies.interface"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getProfileMovies } from "../../../services/api"

export default function ProfilePage() {
  const router = useRouter()
  // const { userId } = router.query as any
  const [movies, setMovies] = useState<Movies[]>([])

  useEffect(() => {
    fetchProfileMovies();
  }, []);

  async function fetchProfileMovies() {
    try {
      const moviesData = await getProfileMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  return (
    // <h1>DASHBOARD PROFILE</h1>
    <div>
      <h1>Movies for Profile:</h1>
      <ul>
        {movies.map((movie: Movies) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  )
}