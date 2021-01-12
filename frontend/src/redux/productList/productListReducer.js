import productListActionTypes from './productListActionTypes';

const INITIAL_STATE = {
  products: [],
  loading: false,
  error: null
};

export const productListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productListActionTypes.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case productListActionTypes.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null
      };
    case productListActionTypes.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case productListActionTypes.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case productListActionTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case productListActionTypes.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
