import axios from 'axios';
import productListActionTypes from './productListActionTypes';

export const listProductsFromProductList = (keyword = '') => async dispatch => {
  try {
    dispatch({
      type: productListActionTypes.PRODUCT_LIST_REQUEST
    });

    const { data } = await axios.get(`/api/products?keyword=${keyword}`);

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

export const createProductToProductList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: productListActionTypes.PRODUCT_CREATE_REQUEST
    });

    const {
      currentUser: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: productListActionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }
    dispatch({
      type: productListActionTypes.PRODUCT_CREATE_FAIL,
      payload: message
    });
  }
};

export const updateProductFromProductList = product => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: productListActionTypes.PRODUCT_UPDATE_REQUEST
    });

    const {
      currentUser: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: productListActionTypes.PRODUCT_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: productListActionTypes.PRODUCT_UPDATE_FAIL,
      payload: message
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

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: productListActionTypes.PRODUCT_REVIEW_CREATE_REQUEST
    });

    const {
      currentUser: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: productListActionTypes.PRODUCT_REVIEW_CREATE_SUCCESS
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: productListActionTypes.PRODUCT_REVIEW_CREATE_FAIL,
      payload: message
    });
  }
};
