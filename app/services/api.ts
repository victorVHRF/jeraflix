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