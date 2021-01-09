import productDetailsActionTypes from './productDetailsActionTypes';

const INITIAL_STATE = {
  product: { loading: false, error: null, reviews: [] }
};

const productDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productDetailsActionTypes.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case productDetailsActionTypes.PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload, error: null };
    case productDetailsActionTypes.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productDetailsReducer;
