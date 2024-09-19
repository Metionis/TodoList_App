import express from 'express';
import dotenv from 'dotenv';

dotenv.config()

const app = express()

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is started at ${process.env.PORT}`);
})