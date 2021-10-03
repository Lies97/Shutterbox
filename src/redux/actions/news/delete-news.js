import axios from 'axios';
import {
  DELETE_NEWS,
  DELETE_NEWS_FAILURE,
  DELETE_NEWS_SUCCESS,
} from '../../types/news/delete-news';
import utils from '../../../helper';

const { apiUrl, localUrl } = utils;

const url = process.env.REACT_APP_STAGE.includes('development')
  ? `${localUrl}/posts`
  : `${apiUrl}/posts`;

export const deleteNews = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_NEWS });
    return axios
      .delete(`${url}/${id}`)
      .then((payload) =>
        dispatch({ type: DELETE_NEWS_SUCCESS, payload: 'Deleted' })
      )
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: DELETE_NEWS_FAILURE,
            error: err.response.data.message,
          });
        }
      });
  };
};
