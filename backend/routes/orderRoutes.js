import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
// should place after '/' route, otherwise, 
// anything after '/' will be reconginised as id.
router.route('/:id').get(protect, getOrderById);

export default router;
