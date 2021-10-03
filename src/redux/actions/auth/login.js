import axios from 'axios';
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from '../../types/auth/login';
import utils from '../../../helper';

const { apiUrl, localUrl } = utils;

const url = process.env.REACT_APP_STAGE.includes('development') ? `${localUrl}/auth/signin` : `${apiUrl}/auth/signin`;

export const login = (values) => {
  return (dispatch) => {
    dispatch({ type: LOGIN });
    return axios
      .post(url, values)
      .then((payload) =>
        dispatch({ type: LOGIN_SUCCESS, payload: payload.data })
      )
      .catch((err) => {
        dispatch({ type: LOGIN_FAILURE, error: err.response.data.message });
      });
  };
};
