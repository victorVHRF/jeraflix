import fastify, { FastifyInstance } from 'fastify'
import { connectDB } from '../db/db'
import { profileRoutes } from '../routes/profileRoutes'

let app: FastifyInstance
let token: string

beforeAll(async () => {
  app = fastify()
  app.register(profileRoutes)
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
})

afterAll(async () => {
  await app.close()
})

describe('Profile Routes', () => {
  it('should create a profile', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/profiles',
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        name: 'profile'
      }
    })
    expect(response.statusCode).toBe(201)
    expect(response.json()).toHaveProperty('profile')
  })

  it('should list profiles', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/profiles',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    expect(response.statusCode).toBe(200)
    expect(response.json()).toBeInstanceOf(Array)
  })
})
