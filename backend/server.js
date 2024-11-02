import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/route.auth.js';
import taskRoute from './routes/route.task.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoute.js';

dotenv.config();

// Connect to database before starting the server
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());



// Public route for authentication (e.g., signup, login)
app.use("/api/auth", authRoutes);

// Middleware to protect routes
app.use(protectRoute);

// Protected routes for tasks
app.use("/api/tasks", taskRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is started at http://localhost:${PORT}`);
});
