import express from 'express';
import { addToCart, deleteCart, getCart, updateCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/UserMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.put('/:productId', authMiddleware, updateCart); // Update route definition
router.delete('/:productId', authMiddleware, deleteCart);

export default router;