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
import { JsonApi } from '../../../helper/json-api.ts';
import { SingleNews } from '../../../models/single-news.ts';

const { apiUrl, localUrl } = utils;

const includedRelationships = ['author', 'category'];
const includedCategory = ['category'];
const url = process.env.REACT_APP_STAGE.includes('development')
  ? `${localUrl}/posts`
  : `${apiUrl}/posts`;

// const url = process.env.REACT_APP_STAGE.includes('development')
//   ? `${localUrl}/api/posts?include=${includedRelationships}`
//   : `${apiUrl}/api/posts?include=${includedRelationships}`;

export const fetchNews = (categoryId = 0) => {
  console.log(categoryId);
  const filter = categoryId ? `&filter[category.id][eq]=${categoryId}` : '';

  const url = process.env.REACT_APP_STAGE.includes('development')
    ? `${localUrl}/api/posts?include=${includedCategory}${filter}`
    : `${apiUrl}/api/posts?include=${includedCategory}${filter}`;

  return (dispatch) => {
    dispatch({ type: GET_NEWS });
    return axios
      .get(url)
      .then((payload) => {
        const posts = payload.data.data.map((post, i) => {
          return JsonApi.parseJsonApi(
            SingleNews,
            post,
            payload.data.included
          );
        });
        // const posts = JsonApi.parseJsonApi(
        //   SingleNews,
        //   payload.data.data,
        //   payload.data.included
        // );
        return dispatch({
          type: GET_NEWS_SUCCESS,
          payload: posts,
        });
      })
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
  const url = process.env.REACT_APP_STAGE.includes('development')
    ? `${localUrl}/api/posts/${id}?include=${includedRelationships}`
    : `${apiUrl}/api/posts/${id}?include=${includedRelationships}`;

  return (dispatch) => {
    dispatch({ type: GET_NEWS_BY_ID });
    return axios
      .get(`${url}`)
      .then((payload) => {
        const singleNews = JsonApi.parseJsonApi(
          SingleNews,
          payload.data.data,
          payload.data.included
        );
        delete singleNews.author.password;
        console.log('singleNews', singleNews);
        return dispatch({
          type: GET_NEWS_BY_ID_SUCCESS,
          payload: {
            ...singleNews,
            section: JSON.parse(singleNews.section),
          },
        });
      })
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
