import { combineReducers } from 'redux';
import productListReducer from './productList/productListReducer';

const rootReducer = combineReducers({
  productList: productListReducer
});

export default rootReducer;
