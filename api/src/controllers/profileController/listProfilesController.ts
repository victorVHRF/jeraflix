import { FastifyReply, FastifyRequest } from "fastify"
import { listProfilesService } from "../../services/profileService/listProfilesService"

export async function listProfilesController(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.params

  try {
    const profiles = await listProfilesService(userId)
    reply.send(profiles)
  } catch (error: any) {
    reply.status(400).send({ message: error.message })
  }
}
