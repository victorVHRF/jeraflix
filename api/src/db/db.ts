import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE!)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB', error)
    process.exit(1)
  }
}