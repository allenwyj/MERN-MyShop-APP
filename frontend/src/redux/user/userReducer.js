import userActionTypes from './userActionTypes';

const INITIAL_STATE = { loading: false, error: null };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOGIN_REQUEST:
    case userActionTypes.USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case userActionTypes.USER_LOGIN_SUCCESS:
    case userActionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null
      };
    case userActionTypes.USER_LOGIN_FAIL:
    case userActionTypes.USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionTypes.USER_LOGOUT:
      return { ...state, error: null, userInfo: null };
    default:
      return state;
  }
};

export default userReducer;
