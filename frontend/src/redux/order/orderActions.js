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
