import userActionTypes from './userActionTypes';

const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  userInfo: null
};

// Maybe can be scalable for saving user's credentials
export const currentUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
        loading: false,
        success: false
      };
    case userActionTypes.USER_LOGIN_REQUEST:
    case userActionTypes.USER_REGISTER_REQUEST:
    case userActionTypes.USER_DETAILS_REQUEST:
    case userActionTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false
      };
    case userActionTypes.USER_LOGIN_SUCCESS:
    case userActionTypes.USER_REGISTER_SUCCESS:
    case userActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: action.payload
      };
    case userActionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        userInfo: action.payload
      };
    case userActionTypes.USER_LOGIN_FAIL:
    case userActionTypes.USER_REGISTER_FAIL:
    case userActionTypes.USER_DETAILS_FAIL:
    case userActionTypes.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case userActionTypes.USER_LOGOUT:
      return {
        ...state,
        error: null,
        success: false,
        userInfo: null
      };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userActionTypes.USER_LIST_REQUEST:
      return { loading: true };
    case userActionTypes.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case userActionTypes.USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case userActionTypes.USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userListModifyReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_DELETE_REQUEST:
      return { loading: true };
    case userActionTypes.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case userActionTypes.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
