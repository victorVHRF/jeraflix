import { FastifyInstance } from "fastify";
import { createProfile, listProfiles } from "../controllers/profileController";

export async function profileRoutes(app: FastifyInstance) {
  app.post('/profiles', createProfile)
  app.get('/profiles/:userId', listProfiles)
}
