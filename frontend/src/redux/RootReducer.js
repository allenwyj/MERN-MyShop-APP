import { combineReducers } from 'redux';
import productListReducer from './productList/productListReducer';
import productDetailsReducer from './productDetails/productDetailsReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer
});

export default rootReducer;
