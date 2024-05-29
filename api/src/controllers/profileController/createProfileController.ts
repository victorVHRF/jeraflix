import { FastifyReply, FastifyRequest } from "fastify"
import { createProfileService } from "../../services/profileService/createProfileService"

export async function createProfileController (request: FastifyRequest, reply: FastifyReply) {
  const { userId, name } = request.body as any

  try {
    const profile = await createProfileService(userId, name)
    reply.status(201).send(profile)
  } catch (error: any) {
    reply.status(400).send({ message: error.message })
  }
}
