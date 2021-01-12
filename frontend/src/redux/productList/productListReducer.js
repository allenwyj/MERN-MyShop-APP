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

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case productListActionTypes.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case productListActionTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case productListActionTypes.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case productListActionTypes.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productListActionTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case productListActionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case productListActionTypes.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case productListActionTypes.PRODUCT_UPDATE_RESET:
      return { product: {} };
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
