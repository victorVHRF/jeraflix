import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import { User } from "../models/userModel";
import { loginUserService, registerUserService } from '../services/authService';

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const { email, password, name, birthDate } = request.body as any;

  try {
    const user = await registerUserService(email, password, name, birthDate);
    reply.status(201).send({ message: 'User registered successfully' });
  } catch (error: any) {
    reply.status(400).send({ message: error.message });
  }
};

export async function login(request: FastifyRequest, reply: FastifyReply){
  const { email, password } = request.body as any;

  try {
    const token = await loginUserService(email, password);
    reply.send({ token });
  } catch (error:any) {
    reply.status(400).send({ message: error.message });
  }
}

export async function socialLogin(request: FastifyRequest, reply: FastifyReply){
  const { facebookId, name, email, birthDate } = request.body as any

  try {
    let user = await User.findOne({ facebookId })

    if(!user){
      user = new User({ facebookId, name, email, birthDate })
      await user.save()
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!)

    reply.send(token)
  } catch (error) {
    reply.status(500).send({ message: 'Erro ao realizar login.' })
  }
}