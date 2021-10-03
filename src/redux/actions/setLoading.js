import { SET_LOADING } from '../types/set-loading';
export const setLoading = (isLoading) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: isLoading });
  };
};
