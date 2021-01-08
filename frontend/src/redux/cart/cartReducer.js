import cartActionTypes from './cartActionTypes';

const INITIAL_STATE = {
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        // check if product is already in cart
        cart => cart.product === item.product
      );
      // item is in the cart
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(cart =>
            cart.product === existItem.product ? item : cart
          )
        };
        // item is not in the cart
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }
    case cartActionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.product !== action.payload
        )
      };
    case cartActionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      };
    case cartActionTypes.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
