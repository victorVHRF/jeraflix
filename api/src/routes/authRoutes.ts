import { FastifyInstance } from 'fastify';
import { login, register, socialLogin } from '../controllers/authController';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', register);
  fastify.post('/login', login);
  fastify.post('/social-login', socialLogin);
}

