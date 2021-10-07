import {
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
  GET_NEWS_BY_ID,
  GET_NEWS_BY_ID_FAILURE,
  GET_NEWS_BY_ID_SUCCESS,
} from '../types/news/fetch-news';

import {
  GET_NEWS_CATEGORY,
  GET_NEWS_CATEGORY_FAILURE,
  GET_NEWS_CATEGORY_SUCCESS,
} from '../types/news/get-news-category';


import {
  CREATE_NEWS,
  CREATE_NEWS_FAILURE,
  CREATE_NEWS_SUCCESS,
} from '../types/news/create-news';

import {
  DELETE_NEWS,
  DELETE_NEWS_FAILURE,
  DELETE_NEWS_SUCCESS,
} from '../types/news/delete-news';

const INITIAL_STATE = {
  isLoading: null,
  deleteLoading: null,
  news: [],
  newsCategory: [],
  newsCategoryErr: [],
  newsErr: null,
  singleNewsData: null,
  singleNewsError: null,
  createNewsData: null,
  createNewsError: null,
  deleteNewsData: null,
  deleteNewsError: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

    case GET_NEWS_CATEGORY:
      return {
        ...state,
        isLoading: true,
        newsCategory: [],
        newsCategoryErr: null,
      };

    case GET_NEWS_CATEGORY_SUCCESS:
      return {
        ...state,
        newsCategory: action.payload,
        newsCategoryErr: null,
        isLoading: false,
      };

    case GET_NEWS_CATEGORY_FAILURE:
      return {
        ...state,
        newsCategory: [],
        newsCategoryErr: action.error,
        isLoading: false,
      };

    case GET_NEWS_BY_ID:
      return {
        ...state,
        isLoading: true,
        singleNewsData: [],
        singleNewsError: null,
      };

    case GET_NEWS_BY_ID_SUCCESS:
      return {
        ...state,
        singleNewsData: action.payload,
        singleNewsError: null,
        isLoading: false,
      };

    case GET_NEWS_BY_ID_FAILURE:
      return {
        ...state,
        singleNewsData: [],
        singleNewsError: action.error,
        isLoading: false,
      };

    case CREATE_NEWS:
      return {
        ...state,
        isLoading: true,
        createNewsData: null,
        createNewsError: null,
      };

    case CREATE_NEWS_SUCCESS:
      return {
        ...state,
        createNewsData: action.payload,
        createNewsError: null,
        isLoading: false,
      };

    case CREATE_NEWS_FAILURE:
      return {
        ...state,
        createNewsData: null,
        createNewsError: action.error,
        isLoading: false,
      };

    case DELETE_NEWS:
      return {
        ...state,
        deleteLoading: true,
        createNewsData: null,
        createNewsError: null,
      };

    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        deleteNewsData: action.payload,
        deleteNewsError: null,
        deleteLoading: false,
      };

    case DELETE_NEWS_FAILURE:
      return {
        ...state,
        deleteNewsData: null,
        deleteNewsError: action.error,
        deleteLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
