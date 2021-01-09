import express from 'express';
const router = express.Router();
import { authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.post('/login', authUser);
// passing authMiddleware into the first argument
// protect middleware will run when this route is hitted
router.route('/profile').get(protect, getUserProfile);

export default router;
