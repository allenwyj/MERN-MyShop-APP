import { combineReducers } from 'redux';
import {
  productListReducer,
  productTopRatedReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
  productReviewCreateReducer,
  productReviewsReducer
} from './productList/productListReducer';
import productDetailsReducer from './productDetails/productDetailsReducer';
import cartReducer from './cart/cartReducer';
import {
  orderReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderMyListReducer,
  orderListReducer
} from './order/orderReducer';
import {
  currentUserReducer,
  userListReducer,
  userListModifyReducer,
  userInfoReducer
} from './user/userReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productTopRated: productTopRatedReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productReviews: productReviewsReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  currentUser: currentUserReducer,
  userList: userListReducer,
  userListModify: userListModifyReducer,
  // for admin modifies users
  userInfo: userInfoReducer,
  order: orderReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMyList: orderMyListReducer,
  orderList: orderListReducer
});

export default rootReducer;
