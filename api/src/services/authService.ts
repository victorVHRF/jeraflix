import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from "../models/userModel"

export async function registerUserService(email: string, password: string, name: string, birthDate: Date){
  const existingUser = await User.findOne({ email })

  if(existingUser){
    throw new Error('Usuario já está em uso.')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ email, password: hashedPassword, name, birthDate })
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

export async function socialLoginService({ facebookId, accessToken, email, name }: SocialLoginParams) {
  let user = await User.findOne({ facebookId })

  if (!user) {
    if (!email) {
      throw new Error('Email is required for new users')
    }
    user = new User({ facebookId, email, name })
    await user.save()
  } else {
    if (user.facebookId !== facebookId) {
      user.facebookId = facebookId
      await user.save()
    }
  }

  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
}