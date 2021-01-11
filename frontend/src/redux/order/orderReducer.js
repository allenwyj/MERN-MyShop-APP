import orderActionTypes from './orderActionTypes';

const INITIAL_STATE = {
  loading: true, // loading until it fetches data.
  error: null,
  success: false,
  order: { orderItems: [], shippingAddress: {} }
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_CREATE_REQUEST:
    case orderActionTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
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
        order: { orderItems: [], shippingAddress: {} },
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

export default orderReducer;
