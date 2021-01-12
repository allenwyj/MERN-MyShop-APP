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

export const deleteProductFromProductList = id => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: productListActionTypes.PRODUCT_DELETE_REQUEST
    });

    const {
      currentUser: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: productListActionTypes.PRODUCT_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: productListActionTypes.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
