import userActionTypes from './userActionTypes';

const INITIAL_STATE = { loading: false, error: null };

// Maybe can be scalable for saving user's credentials
export const currentUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
        loading: false
      };
    case userActionTypes.USER_LOGIN_REQUEST:
    case userActionTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      };
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
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case userActionTypes.USER_LOGOUT:
      return {
        ...state,
        error: null,
        userInfo: null
      };
    default:
      return state;
  }
};

// TODO: Maybe can be scalable for saving user's details
export const userDetailsReducer = (
  state = { user: {}, loading: false, error: null, success: null },
  action
) => {
  switch (action.type) {
    case userActionTypes.USER_DETAILS_REQUEST:
    case userActionTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null
      };
    case userActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case userActionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: true,
        error: null
      };
    case userActionTypes.USER_DETAILS_FAIL:
    case userActionTypes.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case userActionTypes.USER_UPDATE_PROFILE_RESET:
      return {
        user: {},
        loading: false,
        error: null,
        success: null
      };
    case userActionTypes.USER_UPDATE_PROFILE_SUCCESS_RESET:
      return {
        ...state,
        success: null
      };
    default:
      return state;
  }
};
