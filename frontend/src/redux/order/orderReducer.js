import orderActionTypes from './orderActionTypes';

const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  order: {}
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false
      };
    case orderActionTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        order: action.payload
      };
    case orderActionTypes.ORDER_CREATE_FAIL:
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

export default orderReducer;
