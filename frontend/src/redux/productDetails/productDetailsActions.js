import axios from 'axios';
import productDetailsActionTypes from './productDetailsActionTypes';

export const listProductDetails = id => async dispatch => {
  try {
    dispatch({
      type: productDetailsActionTypes.PRODUCT_DETAILS_REQUEST
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: productDetailsActionTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: productDetailsActionTypes.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
