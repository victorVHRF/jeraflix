import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from "../models/userModel"

export async function registerUserService(email: string, password: string, name: string, birthDate: Date){
  const existingUser = await User.findOne({ email })

  if(existingUser){
    throw new Error('Usuario já está em uso.')
  }

  const hasedhPassword = await bcrypt.hash(password, 10)
  const user = new User({ email, password: hasedhPassword, name, birthDate })
  await user.save()
  return user
}

export async function loginUserService(email: string, password: string){
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid email or password')
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!)
  return token
}

export async function socialLoginService({ facebookId, accessToken }: any) {
  let user = await User.findOne({ facebookId })
  if (!user) {
    user = new User({ facebookId, name: 'Facebook User' })
    await user.save()
  }
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
}