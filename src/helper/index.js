const apiUrl = 'https://shutterbox.herokuapp.com';

const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
};

const getSessionStorage = (key, value) => {
  return sessionStorage.getItem(key, value);
};

const utils = { apiUrl, setSessionStorage, getSessionStorage };
export default utils;
