// There are many function as: add task, delete task, change the priority, change the date.
import {Task}  from "../models/model.task.js";
import { User } from '../models/model.user.js';

export async function addTask (req, res) {
  try {
    const { title, details, date, priority } = req.body;

    if (!title || !details || !date || !priority) {
      return res.status(400).json({
        sucess: "Fail",
        message: "All feilds are required"
      })
    }
  } catch (error) {
    
  }

}