import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';
// routes
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config();

const app = express();

// connect to DB
connectDb()

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
