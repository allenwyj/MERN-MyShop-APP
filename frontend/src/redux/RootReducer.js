import { combineReducers } from 'redux';
import {
  productListReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer
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
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
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
