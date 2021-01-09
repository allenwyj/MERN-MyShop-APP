import userActionTypes from './userActionTypes';
import axios from 'axios';

export const loginUser = (email, password) => async dispatch => {
  try {
    dispatch({
      type: userActionTypes.USER_LOGIN_REQUEST
    });

    // sending the content-type in headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: userActionTypes.USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: userActionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: userActionTypes.USER_LOGOUT
  });
};
