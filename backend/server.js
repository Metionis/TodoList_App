import express from 'express';
import dotenv from 'dotenv';

import { protectRoute } from './middleware/protectRoute.js';
import connectDB from './config/db.js';
import authRoutes from './routes/route.auth.js';
import cookieParser from 'cookie-parser';
import taskRoute from './routes/route.task.js';
dotenv.config()

const app = express()
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes, protectRoute);
app.use("/api/tasks", taskRoute, protectRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is started at ${process.env.PORT}`);
  connectDB();
})