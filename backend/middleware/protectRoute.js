import jwt from 'jsonwebtoken';
import { User } from '../models/model.user.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-todolist"];

    // Check if the token is missing
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    // Find the user by the decoded ID from the token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware
    next();

  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
