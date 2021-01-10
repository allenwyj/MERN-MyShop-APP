import { combineReducers } from 'redux';
import productListReducer from './productList/productListReducer';
import productDetailsReducer from './productDetails/productDetailsReducer';
import cartReducer from './cart/cartReducer';
import { currentUserReducer, userDetailsReducer } from './user/userReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  currentUser: currentUserReducer,
  userDetails: userDetailsReducer
});

export default rootReducer;
