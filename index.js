import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/UserRoute.js';
import productRoutes from './routes/ProductRoutes.js';
import categoryRoutes from './routes/CategoryRoutes.js';
import cartRoutes from './routes/CartRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

// Test Build
app.get('/', (req, res) => {
  res.send("Welcome To MyApotik!");
})

// Routes
app.use('/uploads', express.static('uploads'));
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/category', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
