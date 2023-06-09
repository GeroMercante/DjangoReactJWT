import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_CONFIRM_SUCCESS,
  USER_RESET_PASSWORD_CONFIRM_FAIL,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_ACTIVATE_ACCOUNT_SUCCESS,
  USER_ACTIVATE_ACCOUNT_FAIL,
  LOGOUT,
} from "../types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case USER_LOGIN:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };

    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };

    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null,
      };

    case USER_LOGIN_FAIL:
    case USER_SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };

    case USER_RESET_PASSWORD_SUCCESS:
    case USER_RESET_PASSWORD_FAIL:
    case USER_RESET_PASSWORD_CONFIRM_SUCCESS:
    case USER_RESET_PASSWORD_CONFIRM_FAIL:
    case USER_ACTIVATE_ACCOUNT_SUCCESS:
    case USER_ACTIVATE_ACCOUNT_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}
