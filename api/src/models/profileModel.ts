import mongoose, { Document, Schema } from "mongoose"

interface IProfile extends Document {
  userId: mongoose.Types.ObjectId
  name: string
}

const profileSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }
})

export const Profile = mongoose.model<IProfile>('Profile', profileSchema)

