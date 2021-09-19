const apiUrl = 'https://shutterbox.herokuapp.com';
const localUrl = 'http://localhost:4000';

const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
};

const getSessionStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key)) || {};
};

const utils = { localUrl, apiUrl, setSessionStorage, getSessionStorage };
export default utils;
