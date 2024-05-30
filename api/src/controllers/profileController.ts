import { FastifyReply, FastifyRequest } from "fastify"
import { createProfileService, getProfileMoviesService, listProfilesService } from "../services/profileService"

export async function createProfile (request: FastifyRequest, reply: FastifyReply){
  const { userId } = request.user as any
  const { name } = request.body as any

  try {
    const profile = await createProfileService(userId, name)
    reply.status(201).send(profile)
  } catch (error: any) {
    reply.status(400).send({message: error.message})
  }
}

export async function listProfiles(request: FastifyRequest, reply: FastifyReply){
  const { userId } = request.user as any

  try {
    const profiles = await listProfilesService(userId)
    reply.send(profiles)
  } catch (error: any) {
    reply.status(400).send({message: error.message})
  }
}

export async function getProfileMovies(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.params as any
  
  try {
    const movies = await getProfileMoviesService(userId)
    reply.send(movies)
  } catch (error: any) {
    reply.status(400).send({ message: error.message })
  }
}