import fastify, { FastifyInstance } from 'fastify'
import { connectDB } from '../db/db'
import { authRoutes } from '../routes/authRoutes'

let app: FastifyInstance

beforeAll(async () => {
  app = fastify()
  app.register(authRoutes)
  await connectDB()
})

afterAll(async () => {
  await app.close()
})

describe('Auth Routes', () => {
  it('should register a user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/register',
      payload: {
        email: 'email@email.com',
        password: '123456',
        name: 'fulano',
        birthDate: '2000-01-01'
      }
    })
    expect(response.statusCode).toBe(201)
    expect(response.json()).toHaveProperty('token')
  })

  it('should login a user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'email@email.com',
        password: '123456'
      }
    })
    expect(response.statusCode).toBe(200)
    expect(response.json()).toHaveProperty('token')
  })
})
