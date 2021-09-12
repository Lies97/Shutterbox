import axios from 'axios';
import { GET_NEWS, GET_NEWS_FAILURE, GET_NEWS_SUCCESS } from './types/fetch-news';

const API_KEY = '279147337b4846b1b21e9fb39be1dedb'
const url = `https://newsapi.org/v2/everything?q=apple&from=2021-08-20&to=2021-08-20&sortBy=popularity&apiKey=${API_KEY}`;

export const fetchNews = () => {
  return (dispatch) => {    
    dispatch({ type: GET_NEWS });
    return axios.get(url).then(  
      payload => dispatch({ type: GET_NEWS_SUCCESS, payload: payload.data.articles }),
      error => dispatch({ type: GET_NEWS_FAILURE, error })
    );
  };
};