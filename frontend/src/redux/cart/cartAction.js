import axios from 'axios';
import cartActionTypes from './cartActionTypes';

// getState() returns the current state tree from the store
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: cartActionTypes.CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: cartActionTypes.CART_REMOVE_ITEM,
    payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = address => dispatch => {
  dispatch({
    type: cartActionTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: address
  });

  localStorage.setItem('shippingAddress', JSON.stringify(address));
};
