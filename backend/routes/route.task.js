import express, { Router } from 'express';
import { addTask, deleteTask, changePriority } from '../controllers/controller.task.js';

const router = express.Router();

router.post("/addtask", addTask);
router.post("/deletetask/:taskId", deleteTask);
router.patch('/changePriority', changePriority);

export default router;