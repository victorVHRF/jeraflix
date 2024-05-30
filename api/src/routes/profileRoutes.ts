import { FastifyInstance } from "fastify";
import { createProfile, listProfiles } from "../controllers/profileController";
import { authenticate } from "../utils/auth";

export async function profileRoutes(app: FastifyInstance) {
  app.post('/profiles', createProfile)
  // app.get('/profiles/:userId', listProfiles)
  app.get('/profiles', { preHandler: [authenticate] }, listProfiles);
}
