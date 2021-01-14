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
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
        error: null
      };
    case productListActionTypes.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productTopRatedReducer = (
  state = { loading: true, topProducts: [] },
  action
) => {
  switch (action.type) {
    case productListActionTypes.PRODUCT_TOP_REQUEST:
      return { loading: true, topProducts: [] };
    case productListActionTypes.PRODUCT_TOP_SUCCESS:
      return { loading: false, topProducts: action.payload };
    case productListActionTypes.PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
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

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case productListActionTypes.PRODUCT_REVIEWS_GET_REQUEST:
      return { ...state, isLoading: true };
    case productListActionTypes.PRODUCT_REVIEWS_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
        reviews: action.payload
      };
    case productListActionTypes.PRODUCT_REVIEWS_GET_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case productListActionTypes.PRODUCT_REVIEWS_GET_RESET:
      return { reviews: [] };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case productListActionTypes.PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case productListActionTypes.PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true };
    case productListActionTypes.PRODUCT_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case productListActionTypes.PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
