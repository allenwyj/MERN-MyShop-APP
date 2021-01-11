import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
// should place after '/' route, otherwise,
// anything after '/' will be reconginised as id.
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
