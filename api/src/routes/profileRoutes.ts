import { FastifyInstance } from "fastify";
import { createProfileController } from "../controllers/profileController/createProfileController";


export async function profileRoutes(fastify: FastifyInstance) {
  fastify.post('/profiles', createProfileController)
}
