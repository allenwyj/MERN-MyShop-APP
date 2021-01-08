import axios from 'axios';

import productListActionTypes from './productListActionTypes';

export const productListActions = () => async dispatch => {
  try {
    dispatch({
      type: productListActionTypes.PRODUCT_LIST_REQUEST
    });

    const { data } = await axios.get('/api/products');

    dispatch({
      type: productListActionTypes.PRODUCT_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: productListActionTypes.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
