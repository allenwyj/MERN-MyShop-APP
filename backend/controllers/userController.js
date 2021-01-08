import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find a user by using email.
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password.');
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
// const getProductById = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404);
//     // throws error and gets it handled by errorHandler
//     throw new Error('Product not found');
//   }
// });

export { authUser };
