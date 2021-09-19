import axios from 'axios';
import {
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
  GET_NEWS_BY_ID,
  GET_NEWS_BY_ID_FAILURE,
  GET_NEWS_BY_ID_SUCCESS,
} from '../../types/news/fetch-news';
import utils from '../../../helper';

const { apiUrl, localUrl } = utils;

const url = process.env.REACT_APP_STAGE.includes('development') ? `${localUrl}/posts` : `${apiUrl}/posts`;

export const fetchNews = () => {
  return (dispatch) => {
    dispatch({ type: GET_NEWS });
    return axios
      .get(url)
      .then((payload) =>
        dispatch({ type: GET_NEWS_SUCCESS, payload: payload.data })
      )
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: GET_NEWS_FAILURE,
            error: err.response.data.message,
          });
        }
      });
  };
};

export const fetchNewsById = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_NEWS_BY_ID });
    return axios
      .get(`${url}/${id}`)
      .then((payload) =>
        dispatch({
          type: GET_NEWS_BY_ID_SUCCESS,
          payload: {
            ...payload.data,
            section: JSON.parse(payload.data.section),
          },
        })
      )
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: GET_NEWS_BY_ID_FAILURE,
            error: err.response.data.message,
          });
        }
      });
  };
};
