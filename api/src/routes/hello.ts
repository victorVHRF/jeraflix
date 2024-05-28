import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function hello(app: FastifyInstance) {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send('hello')
  })
}