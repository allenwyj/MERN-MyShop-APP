import orderActionTypes from './orderActionTypes';

const INITIAL_STATE = {
  loading: true, // loading until it fetches data.
  error: null,
  success: false,
  order: { orderItems: [], shippingAddress: {} }
};

export const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_CREATE_REQUEST:
    case orderActionTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case orderActionTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload
      };
    case orderActionTypes.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload
      };
    case orderActionTypes.ORDER_CREATE_FAIL:
    case orderActionTypes.ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case orderActionTypes.ORDER_RESET:
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_PAY_REQUEST:
      return {
        loading: true
      };
    case orderActionTypes.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case orderActionTypes.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case orderActionTypes.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
