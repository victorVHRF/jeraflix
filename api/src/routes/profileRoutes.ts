import { FastifyInstance } from "fastify";
import { createProfile, getProfileMovies, listProfiles } from "../controllers/profileController";
import { authenticate } from "../utils/auth";

export async function profileRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authenticate)
  app.post('/profiles', createProfile)
  app.get('/profiles/:userId/movies', getProfileMovies)
  app.get('/profiles', { preHandler: [authenticate] }, listProfiles);
}
