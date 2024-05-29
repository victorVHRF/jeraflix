import mongoose, { Document, Schema } from 'mongoose'

interface IMovie extends Document {
  profileId: mongoose.Types.ObjectId
  movieId: number
  title: string
  watched: boolean
  watchlist: boolean
  scheduledAt?: Date
}

const movieSchema: Schema = new Schema({
  profileId: { type: mongoose.Types.ObjectId, ref: 'Profile', required: true },
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  watched: { type: Boolean, default: false },
  watchlist: { type: Boolean, default: false },
  scheduledAt: { type: Date }
})

export const Movie = mongoose.model<IMovie>('Movie', movieSchema)
