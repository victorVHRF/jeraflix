import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import { User } from "../models/userModel";

export async function register(request: FastifyRequest, reply: FastifyReply){
  const { email, password, name, birthdate } = request.body as any

  try {
    const existinUser = await User.findOne({ email })

    if(existinUser){
      return reply.status(400).send({ message: 'Este email já está em uso.'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hashedPassword, name, birthdate })
    await user.save()

    reply.status(200).send({ message: 'Usuario registrado com sucesso.' })
  } catch (error) {
    reply.status(500).send({ message: 'Erro ao registrar usuario.' })
  }
}

export async function login(request: FastifyRequest, reply: FastifyReply){
  const { email, password } = request.body as any

  try {
    const user = await User.findOne({ email })

    if(!user){
      return reply.status(400).send({ message: 'Usuario ou senha invalida.' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
      return reply.status(400).send({ message: 'Usuario ou senha invalida.' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!)

    reply.send(token)
  } catch (error) {
    reply.status(500).send({ message: 'Erro ao realizar login.' })
  }
}

export async function socialLogin(request: FastifyRequest, reply: FastifyReply){
  const { facebookId, name, email, birthdate } = request.body as any

  try {
    let user = await User.findOne({ facebookId })

    if(!user){
      user = new User({ facebookId, name, email, birthdate })
      await user.save()
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!)

    reply.send(token)
  } catch (error) {
    reply.status(500).send({ message: 'Erro ao realizar login.' })
  }
}