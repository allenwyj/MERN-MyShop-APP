import productDetailsActionTypes from './productDetailsActionTypes';

const INITIAL_STATE = {
  product: { reviews: [] }
};

const productDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productDetailsActionTypes.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case productDetailsActionTypes.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case productDetailsActionTypes.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productDetailsReducer;
