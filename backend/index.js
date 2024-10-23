import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import expenseRoutes from './routes/expenseRoutes.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config()
const app = express()

app.use(cors(
  { origin: 'http://localhost:5173' }
));
app.use(express.json());

app.use('/expenses', expenseRoutes);
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MONGODB Connected')
  })
  .catch(err => {
    console.error(err)
  })

app.listen(process.env.PORT, () => {
  console.log(`Server Starting On http://localhost:${process.env.PORT}`)
})