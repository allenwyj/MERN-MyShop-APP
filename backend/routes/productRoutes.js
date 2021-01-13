import express from 'express';
const router = express.Router();
import {
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
  createProductReview
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;
