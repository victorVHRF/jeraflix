import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password })
  return response.data
}

export const registerUser = async (email: string, password: string, name: string, birthDate: string) => {
  const response = await api.post('/register', { email, password, name, birthDate })
  return response.data
}

export const getProfiles = async (token: string) => {
  const response = await api.get('/profiles', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const createProfile = async (token: string, name: string) => {
  const response = await api.post('/profiles', { name }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getProfileMovies = async (profileId: string) => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profiles/${profileId}/movies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export async function markMovieAsWatched(profileId: string, movieId: string, title: string) {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/watched`,
    { profileId, movieId, title },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

export async function addMovieToWatchlist(profileId: string, movieId: string, title: string) {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/watchlist`,
    { profileId, movieId, title },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

export async function getTopRatedMovies () {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/top-rated`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}