import fastify, { FastifyInstance } from 'fastify'
import { connectDB } from '../db/db'
import { movieRoutes } from '../routes/movieRoutes'

let app: FastifyInstance
let token: string
let profileId: string

beforeAll(async () => {
  app = fastify()
  app.register(movieRoutes)
  await connectDB()

  const authResponse = await app.inject({
    method: 'POST',
    url: '/register',
    payload: {
      email: 'email@email.com',
      password: '123456',
      name: 'fulano',
      birthDate: '2000-01-01'
    }
  })
  token = authResponse.json().token

  const profileResponse = await app.inject({
    method: 'POST',
    url: '/profiles',
    headers: {
      Authorization: `Bearer ${token}`
    },
    payload: {
      name: 'Adulto'
    }
  })
  profileId = profileResponse.json().profile._id
})

afterAll(async () => {
  await app.close()
})

describe('Movie Routes', () => {
  it('should add a movie to watchlist', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/movies/watchlist',
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        profileId: profileId, //665893bad600d8f14109453b
        movieId: '755450',
        title: 'Godfather'
      }
    })
    expect(response.statusCode).toBe(201)
    expect(response.json()).toHaveProperty('watchList', true)
  })

  it('should list watchlist movies', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/profiles/${profileId}/movies`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    expect(response.statusCode).toBe(200)
    expect(response.json()).toBeInstanceOf(Array)
  })
})
