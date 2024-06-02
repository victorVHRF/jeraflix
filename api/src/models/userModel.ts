import mongoose, { Document, Schema } from 'mongoose'

interface IUser extends Document {
  email: string
  password?: string
  name: string
  birthDate?: Date
  facebookId?: string
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  birthDate: { type: Date },
  facebookId: { type: String, unique: true, sparse: true }
})

export const User = mongoose.model<IUser>('User', userSchema)
