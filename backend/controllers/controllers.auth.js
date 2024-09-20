import express from 'express';
import { User } from '../models/model.user.js';
import bcryptjs from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

/**
 * Create a new user
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function signup(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: "fail",
      message: "Missing username or password"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: "fail",
      message: "Password must be at least 6 characters long"
    });
  }

  const existedUser = await User.findOne({ username });

  if (existedUser) {
    return res.status(400).json({
      success: "fail",
      message: "Username already exists"
    });
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({ 
      username, 
      password: hashedPassword,
      image,
    });

    await newUser.save();

    // Generate and send token
    generateToken(newUser._id, res);

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
      message: "User created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: "fail",
      message: "Internal server error"
    });
  }
}

/**
 * Login a user
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: "fail", message: "Missing username or password. All fields are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ success: "fail", message: "User does not exist" });
    }

    const passwordIsCorrect = await bcryptjs.compare(password, user.password);

    if (!passwordIsCorrect) {
      return res.status(400).json({ success: "fail", message: "Password is incorrect" });
    }

    // Generate and send token
    generateToken(user._id, res);

    res.status(200).json({
      success: "success",
      user: {
        ...user._doc,
        password: "",
      },
      message: "Login successful"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: "fail", message: "Internal server error" });
  }
}

/**
 * Logout the user
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-todolist"); // Clear the correct cookie
    res.status(200).json({ success: "success", message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: "fail", message: "Internal server error" });
  }
}
