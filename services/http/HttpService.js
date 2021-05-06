import React from 'react';
import axios from 'axios';
class HttpServices {
  constructor() {}
  get(url, config = {}) {
    const res = axios
      .get(url, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return {error: error.response.data, status: error.response.status};
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          return error.request;
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          return error.message;
        }
      });
    return res;
  }
  put(url, body, config = {}) {
    const res = axios
      .put(url, body, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return {error: error.response.data, status: error.response.status};
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          return error.request;
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          return error.message;
        }
      });
    return res;
  }
  post(url, body, config = {}) {
    const res = axios
      .post(url, body, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return {error: error.response.data, status: error.response.status};
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          return error.request;
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          return error.message;
        }
      });
    return res;
  }
  patch(url, body, config = {}) {
    const res = axios
      .patch(url, body, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return {error: error.response.data, status: error.response.status};
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          return error.request;
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          return error.message;
        }
      });
    return res;
  }
}

export default new HttpServices();
