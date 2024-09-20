import express, { Router } from 'express';
import { login, signup, logout } from '../controllers/controllers.auth.js';

const router = express.Router();

router.post("/login", login);
router.post("/register", signup);
router.post("/logout", logout);

export default router;