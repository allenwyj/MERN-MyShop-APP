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
  dispatch({
    type: userActionTypes.USER_LOGOUT
  });
  localStorage.removeItem('userInfo');
};

export const registerUser = (name, email, password) => async dispatch => {
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
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: userActionTypes.USER_REGISTER_SUCCESS,
      payload: data
    });

    dispatch({
      type: userActionTypes.USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getUserDetail = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionTypes.USER_DETAILS_REQUEST
    });

    const {
      currentUser: { userInfo }
    } = getState();

    // sending the content-type in headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: userActionTypes.USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: userActionTypes.USER_UPDATE_PROFILE_REQUEST
    });

    const {
      currentUser: { userInfo }
    } = getState();

    // sending the content-type in headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: userActionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    });

    // update currentUser
    dispatch({
      type: userActionTypes.USER_LOGIN_SUCCESS,
      payload: data
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
