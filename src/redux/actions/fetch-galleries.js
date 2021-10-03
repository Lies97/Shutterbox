import axios from 'axios';
import { GET_GALLERIES, GET_GALLERIES_FAILURE, GET_GALLERIES_SUCCESS } from '../types/fetch-galleries';
const API_KEY = '279147337b4846b1b21e9fb39be1dedb'
const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;

export const fetchGalleries = () => {
  return (dispatch) => {     
    dispatch({ type: GET_GALLERIES });
    return axios.get(url).then(  
      payload => dispatch({ type: GET_GALLERIES_SUCCESS, payload: payload.data.articles }),
      error => dispatch({ type: GET_GALLERIES_FAILURE, error })
    );
  };
};

