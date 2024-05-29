import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from "../models/userModel"

export async function registerUser(email: string, password: string, name: string, birthdate: Date){
  const existingUser = await User.findOne({ email })

  if(existingUser){
    throw new Error('Usuario já está em uso.')
  }

  const hasedhPassword = await bcrypt.hash(password, 10)
  const user = new User({ email, password: hasedhPassword, name, birthdate })
  await user.save()
  return user
}

export async function loginUser(email: string, password: string){
  const user = await User.findOne({ email })

  if(!user){
    throw new Error('Usuario não encontrado.')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if(!passwordMatch){
    throw new Error('Email ou senha incorreta.')
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!)

  return token
}

export async function socialLoginUser(facebookId: string, name: string, email: string, birthdate: Date){
  let user = await User.findOne({ facebookId })

  if(!user){
    user = new User({ facebookId, name, email, birthdate })
    await user.save()
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!)
  return token
}