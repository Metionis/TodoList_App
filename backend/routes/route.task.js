import express, { Router } from 'express';
import { addTask, deleteTask, changePriority, getTask } from '../controllers/controller.task.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/gettask/:taskId", protectRoute, getTask);
router.post("/addtask", protectRoute, addTask, );
router.delete("/deletetask/:taskId", protectRoute, deleteTask);
router.patch('/changePriority', protectRoute, changePriority);

export default router;