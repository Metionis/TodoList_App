import express, { Router } from 'express';
import { addTask, deleteTask } from '../controllers/controller.task.js';

const router = express.Router();

router.post("/addtask", addTask);
router.post("/deletetask/:taskId", deleteTask);

export default router;