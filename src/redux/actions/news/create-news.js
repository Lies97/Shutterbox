import axios from 'axios';
import {
  CREATE_NEWS,
  CREATE_NEWS_FAILURE,
  CREATE_NEWS_SUCCESS,
} from '../../types/news/create-news';
import utils from '../../../helper';

const { apiUrl, localUrl, getSessionStorage } = utils;

const url = process.env.REACT_APP_STAGE.includes('development')
  ? `${localUrl}/posts`
  : `${apiUrl}/posts`;

export const createNews = (values) => {
  return (dispatch) => {
    dispatch({ type: CREATE_NEWS });
    return axios({
      method: 'post',
      url,
      data: values,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getSessionStorage('user').access_token}`,
      },
    })
      .then((payload) =>
        dispatch({ type: CREATE_NEWS_SUCCESS, payload: payload.data })
      )
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: CREATE_NEWS_FAILURE,
            error: err.response.data.message,
          });
        }
      });
  };
};
