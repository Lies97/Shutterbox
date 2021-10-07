import axios from 'axios';
import {
  GET_NEWS_CATEGORY,
  GET_NEWS_CATEGORY_FAILURE,
  GET_NEWS_CATEGORY_SUCCESS,
} from '../../types/news/get-news-category';
import utils from '../../../helper';

const { apiUrl, localUrl } = utils;

const url = process.env.REACT_APP_STAGE.includes('development')
  ? `${localUrl}/posts-category`
  : `${apiUrl}/posts-category`;

export const getNewsCategory = () => {
  return (dispatch) => {
    dispatch({ type: GET_NEWS_CATEGORY });
    return axios({
      method: 'get',
      url,
    })
      .then((payload) =>
        dispatch({ type: GET_NEWS_CATEGORY_SUCCESS, payload: payload.data })
      )
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: GET_NEWS_CATEGORY_FAILURE,
            error: err.response.data.message,
          });
        }
      });
  };
};
