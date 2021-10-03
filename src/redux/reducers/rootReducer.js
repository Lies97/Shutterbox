import { combineReducers } from 'redux';

import homeReducer from './homeReducer';
import authReducer from './authReducer';
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
  homeReducer,
  authReducer,
  newsReducer,
});

export default rootReducer;
