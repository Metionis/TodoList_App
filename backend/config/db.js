import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the mongoDB server sucessfully" +  conn.connection.host);
  } catch (error) {
    console.log("Can not connect to the mongoDB server" + error.message);
    process.exit(1);
  }
}

export default connectDB;