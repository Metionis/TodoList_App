import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

dotenv.config()

const app = express()
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is started at ${process.env.PORT}`);
  connectDB();
})