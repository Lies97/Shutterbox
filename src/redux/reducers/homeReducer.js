import {
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
} from '../types/news/fetch-news';

import {
  GET_GALLERIES,
  GET_GALLERIES_SUCCESS,
  GET_GALLERIES_FAILURE,
} from '../types/fetch-galleries'

import { SET_LOADING } from '../types/set-loading';

const INITIAL_STATE = {
  isLoading: null,
  news: [],
  newsErr: null,
  galleries: [],
  galleriesErr: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case GET_NEWS:
      return {
        ...state,
        isLoading: true,
        news: [],
        newsErr: null,
      };

    case GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload,
        newsErr: null,
        isLoading: false,
      };

    case GET_NEWS_FAILURE:
      return {
        ...state,
        news: [],
        newsErr: action.error,
        isLoading: false,
      };

    case GET_GALLERIES:
      return {
        ...state,
        isLoading: true,
        galleries: [],
        galleriesErr: null,
      };

    case GET_GALLERIES_SUCCESS:
      return {
        ...state,
        galleries: action.payload,
        galleriesErr: null,
        isLoading: false,
      };

    case GET_GALLERIES_FAILURE:
      return {
        ...state,
        galleries: [],
        err: action.error,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
