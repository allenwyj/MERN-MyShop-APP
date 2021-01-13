import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders
} from '../controllers/orderController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
// should place after '/' route, otherwise,
// anything after '/' will be reconginised as id.
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;
