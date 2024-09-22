// There are many function as: add task, delete task, change the priority, change the date.
import {Task}  from "../models/model.task.js";
import { User } from '../models/model.user.js';

export async function addTask (req, res) {
  try {
    const { title, details, date, status, priority } = req.body;

    if (!title || !details || !date ) {
      return res.status(400).json({
        sucess: "Fail",
        message: "All feilds are required"
      })
    }

    const user = req.user;

    const newTask = new Task({
      user: user._id,
      title: title,
      detail: details,
      date: date,
      status: status,
      priority: priority
    })

    await newTask.save();

    res.status(201).json({
      sucess: true,
      task: newTask,
      message: "New Task added"
    })
  } catch (error) {
    console.log("Error adding task to the todo list: " + error.message);
    return res.satus(500).json({
      sucess: false,
      message: "Internal server error"
    })
  }
}

/**
 * Delete a task
 * 
 * This function takes a task ID as a path parameter and
 * deletes the task from the database if the logged-in user
 * is the owner of the task.
 * 
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {string} req.params.taskId - Task ID to be deleted
 */
export async function deleteTask(req, res) {
  try {
    // Get task ID from the request parameters
    const { taskId } = req.params;

    // Get the logged-in user (assuming you have user information from `protectRoute` middleware)
    const user = req.user;

    // Find the task by ID
    const task = await Task.findById(taskId);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Check if the logged-in user is the owner of the task
    if (task.user.toString() !== user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this task" });
    }

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    // Respond with success
    res.status(200).json({ success: true, message: "Task deleted successfully" });

  } catch (error) {
    console.error("Error deleting task: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
