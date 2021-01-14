import express from 'express';
const router = express.Router();
import {
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
  deleteProduct,
  createProduct,
  createProductReview,
  getProductReviews
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router
  .route('/:id/reviews')
  .get(getProductReviews)
  .post(protect, createProductReview);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;
