import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

const getShortOfStocksItems = async orderItems => {
  const shortStockMap = {};

  await Promise.all(
    orderItems.map(async item => {
      try {
        const productId = item.product;
        const foundProduct = await Product.findById(productId);
        const productInStocks = foundProduct.countInStock;
        // add into object if qty > countInStock
        if (productInStocks < item.qty) {
          shortStockMap[productId] = foundProduct.name;
        }
      } catch (error) {
        console.log(error);
      }
    })
  );

  return shortStockMap;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    gstPrice,
    totalPrice
  } = req.body;

  // check orderItems is not empty
  if (orderItems && orderItems.length !== 0) {
    // check order items' stocks
    const outOfStockList = await getShortOfStocksItems(orderItems);

    if (Object.keys(outOfStockList).length === 0) {
      // instantiate a new order
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        gstPrice,
        totalPrice
      });

      const createdOrder = await order.save();

      for (const index in orderItems) {
        const item = orderItems[index];
        const product = await Product.findById(item.product);
        if (product) {
          product.countInStock -= item.qty;
          await product.save();
        }
      }

      res.status(201).json(createdOrder);
    } else {
      outOfStockList.hasValue = true;
      // order items' stock cannot be fullfilled
      res.status(400);
      // return an object contains out of stock item: {productId: productName}
      throw new Error(JSON.stringify(outOfStockList));
    }
  } else {
    res.status(400);
    throw new Error('No order items');
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  // populate from user field to get extra name and email fields
  // originally, it only returns id in the user field
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // PayPal results
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  // only for the login user
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  // the number of items shown on one page
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  // gets 10 orders per time, skips 10 * (page-1) orders
  const orders = await Order.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('user', 'id name email');

  const count = await Order.countDocuments({});

  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});
