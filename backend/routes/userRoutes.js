import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

// /api/users

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUser);
// passing authMiddleware into the first argument
// protect middleware will run when this route is hitted
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/:id').delete(protect, isAdmin, deleteUser);

export default router;
