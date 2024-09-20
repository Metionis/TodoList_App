import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['doing', 'done'],
    required: true,
    default: "doing"
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
    default: 'medium'
  }
})

export const Task = mongoose.model("Task", taskSchema);