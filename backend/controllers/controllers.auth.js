import express from 'express';
import User from '../models/model.user.js';
import bcrypt from 'bcrypt';

/**
 * Create a new user
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function signup(req, res) {
  const { username, password } = req.body;

  // Check if username and password is missing
  if (!username || !password) {
    return res.status(400).json({ sucess: "fail", message: "Missing username or password" });
  }

  // Check if password is valid
  const validPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!validPassword.test(password)) {
    return res.status(400).json({ sucess: "fail", message: "Password is not valid, password must contain at least one number and one special character" });
  }

  // Check if password is too short
  if (password.length < 6) {
    return res.status(400).json({ sucess: "fail", message: "Password is not valid, password must be at least 6 characters long" });
  }

  // Check if username already exists
  const existedUser = await User.findOne({ username });
  if (existedUser) {
    return res.status(400).json({ sucess: "fail", message: "Username already exists" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return success message
    res.status(201).json({ sucess: "fail", message: "User created successfully" });
  } catch (error) {
    // Return error message
    res.status(500).json({ sucess: "fail", message: "Internal server error" });
  }
}

/**
 * Login a user
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function login(req, res) {
  try {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Check if username and password is missing
    if (!username || !password) {
      return res.status(400).json({ sucess: "fail", message: "Missing username or password. All feilds are required" });
    }

    // Find the user with the given username
    const user = await User.findOne({ username: username });

    // Check if the user does not exist
    if (!user) {
      return res.status(400).json({ sucess: "fail", message: "User does not exist" });
    }

    // Check if the password is correct
    const passwordIsCorrect = await bcryptjs.compare(password, user.password);

    // Check if the password is not correct
    if (!passwordIsCorrect) {
      return res.status(400).json({ sucess: "fail", message: "Password is not correct" });
    }

    // Return the user with the password removed
    res.status(200).json({
      sucess: "success", 
      user: {
        ...user._doc,
        password: ""
      },
      message: "Login successfully" 
    });

    // Print a message to the console to indicate that the login was successful
    if (isPasswordCorrect && user) {
      console.log("Login successfully");
    }
  } catch (error) {
    // Print an error message to the console
    console.log(error);
    // Return an error message to the client
    res.status(500).json({ sucess: "fail", message: "Internal server error" });
  }
}
