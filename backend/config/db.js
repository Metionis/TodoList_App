import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = mongoose.connect()
  } catch (error) {
    
  }
}