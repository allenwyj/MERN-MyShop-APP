import axios from 'axios';
import orderActionTypes from './orderActionTypes';

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionTypes.ORDER_CREATE_REQUEST
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

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: orderActionTypes.ORDER_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionTypes.ORDER_DETAILS_REQUEST
    });

    const {
      currentUser: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: orderActionTypes.ORDER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? 'Sorry, we cannot find this order.'
          : error.message
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: orderActionTypes.ORDER_PAY_REQUEST
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
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: orderActionTypes.ORDER_PAY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deliverOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionTypes.ORDER_DELIVER_REQUEST
    });

    const {
      currentUser: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: orderActionTypes.ORDER_DELIVER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionTypes.ORDER_MY_LIST_REQUEST
    });

    const {
      currentUser: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: orderActionTypes.ORDER_MY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_MY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const listOrders = (pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderActionTypes.ORDER_LIST_REQUEST
    });

    const {
      currentUser: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(
      `/api/orders?pageNumber=${pageNumber}`,
      config
    );

    dispatch({
      type: orderActionTypes.ORDER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: orderActionTypes.ORDER_LIST_FAIL,
      payload: message
    });
  }
};
