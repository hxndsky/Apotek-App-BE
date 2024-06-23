import express from 'express';
import {
  getProducts,
  getProductsById,
  postProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from '../controllers/productController.js';
import upload from '../middleware/uploadMiddleware.js'; // Import middleware untuk upload file
import { adminMiddleware, authMiddleware } from '../middleware/UserMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductsById);
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), postProducts); // Gunakan middleware upload
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateProduct); // Gunakan middleware upload
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);
router.get('/category/:id_category', getProductsByCategory);

export default router;
