import jwt from 'jsonwebtoken';

export const generateToken = (id, res) => {
  const token = jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  console.log("Generated Token: ", token);

  res.cookie('jwt-todolist', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: "lax",  // Allows cross-origin requests in some cases
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });  

  return token;
};