import { combineReducers } from 'redux';
import productListReducer from './productList/productListReducer';
import productDetailsReducer from './productDetails/productDetailsReducer';
import cartReducer from './cart/cartReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
});

export default rootReducer;
