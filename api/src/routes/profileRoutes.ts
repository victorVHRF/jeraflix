import { FastifyInstance } from "fastify";
import { createProfileController } from "../controllers/profileController/createProfileController";


export async function profileRoutes(app: FastifyInstance) {
  app.post('/profiles', createProfileController)
  
}
