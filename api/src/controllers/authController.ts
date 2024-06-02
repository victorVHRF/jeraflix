import { FastifyReply, FastifyRequest } from "fastify"
import { loginUserService, registerUserService, socialLoginService, } from '../services/authService'

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const { email, password, name, birthDate } = request.body as any

  try {
    const user = await registerUserService(email, password, name, birthDate)
    reply.status(201).send({ message: 'User registered successfully' })
  } catch (error: any) {
    reply.status(400).send({ message: error.message })
  }
}

export async function login(request: FastifyRequest, reply: FastifyReply){
  const { email, password } = request.body as any

  try {
    const token = await loginUserService(email, password)
    reply.send({ token })
  } catch (error:any) {
    reply.status(400).send({ message: error.message })
  }
}

export async function socialLogin(request: FastifyRequest, reply: FastifyReply) {
  const { facebookId, accessToken, email, name } = request.body as any
  
  try {
    if (!facebookId) {
      throw new Error('Facebook ID is required')
    }
    const token = await socialLoginService({ facebookId, accessToken, email, name })
    reply.send({ token })
  } catch (error: any) {
    reply.status(400).send({ message: error.message })
  }
}