import mongoose from "mongoose";

const userChema = new mongoose.Schema({
  username: {
    require: true,
    type: String,
    unique: true
  },
  password: {
    require: true,
    type: String,
  },
  img: {
    type: String,
    default: "",
  }
})

export const User = mongoose.model("User", userChema);