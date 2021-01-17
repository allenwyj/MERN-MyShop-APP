import orderActionTypes from './orderActionTypes';

const INITIAL_STATE = {
  loading: true, // order details page: loading until it fetches data.
  error: null,
  success: false,
  order: { orderItems: [], shippingAddress: {} }
};

export const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_PAGE_INITIAL_FINISH:
      return {
        ...state,
        loading: false
      };
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

export const orderMyListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_MY_LIST_REQUEST:
      return {
        loading: true
      };
    case orderActionTypes.ORDER_MY_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      };
    case orderActionTypes.ORDER_MY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case orderActionTypes.ORDER_MY_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_DELIVER_REQUEST:
      return {
        loading: true
      };
    case orderActionTypes.ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case orderActionTypes.ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case orderActionTypes.ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_LIST_REQUEST:
      return {
        loading: true
      };
    case orderActionTypes.ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        pages: action.payload.pages,
        page: action.payload.page
      };
    case orderActionTypes.ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
