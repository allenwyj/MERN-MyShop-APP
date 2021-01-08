import productListActionTypes from './productListActionTypes';

const INITIAL_STATE = {
  products: []
};
const productListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productListActionTypes.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case productListActionTypes.PRODUCT_LIST_SUCCESS:
      return { loading: true, products: action.payload };
    case productListActionTypes.PRODUCT_LIST_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};

export default productListReducer;
