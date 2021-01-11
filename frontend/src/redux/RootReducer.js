import { combineReducers } from 'redux';
import productListReducer from './productList/productListReducer';
import productDetailsReducer from './productDetails/productDetailsReducer';
import cartReducer from './cart/cartReducer';
import {
  orderReducer,
  orderPayReducer,
  orderMyListReducer
} from './order/orderReducer';
import { currentUserReducer } from './user/userReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  currentUser: currentUserReducer,
  order: orderReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer
});

export default rootReducer;
