import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../types/auth/register.js';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../types/auth/login.js';

const INITIAL_STATE = {
  isLoading: null,
  registerError: null,
  registerData: '',
  loginData: {},
  loginError: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case REGISTER:
      return {
        ...state,
        isLoading: true,
        registerData: '',
        registerError: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        registerData: action.payload,
        registerError: null,
        isLoading: false,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        registerData: '',
        registerError: action.error,
        isLoading: false,
      };

    case LOGIN:
      return {
        ...state,
        isLoading: true,
        loginData: null,
        loginError: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
        loginError: null,
        isLoading: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loginData: {},
        loginError: action.error,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
