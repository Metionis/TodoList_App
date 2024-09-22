import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true
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
    default: () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      return currentDate;
    },
    required: true,
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