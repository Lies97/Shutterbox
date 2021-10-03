import axios from 'axios';
import {
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from '../../types/auth/register';
import utils from '../../../helper';

const { apiUrl, localUrl } = utils;

const url = process.env.REACT_APP_STAGE.includes('development') ? `${localUrl}/auth/signup` : `${apiUrl}/auth/signup`;

export const register = (values) => {
  return (dispatch) => {
    dispatch({ type: REGISTER });
    return axios
      .post(url, values)
      .then((payload) =>
        dispatch({ type: REGISTER_SUCCESS, payload: payload.data })
      )
      .catch((err) => {
        dispatch({ type: REGISTER_FAILURE, error: err.response.data.message });
      });
  };
};
