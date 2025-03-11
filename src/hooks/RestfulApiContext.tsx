'use client';

import React from 'react';
import axios from 'axios';
import { DELETE, GET, POST, PUT, BASE_URL } from '../constants/Global';

const postLogin = (queryParams, pathParams, body) => {
  return axios({
    method: POST,
    url: BASE_URL + `/api/auth/login/`,
    headers: {
      'Content-Type': 'application/json',
      //   Authentication: 'Bearer ' + '',
    },
    params: queryParams,
    data: body,
  });
};

const postRefresh = (queryParams, pathParams, body) => {
  return axios({
    method: POST,
    url: BASE_URL + `/api/auth/refresh/`,
    headers: {
      'Content-Type': 'application/json',
      //   Authentication: 'Bearer ' + '',
    },
    params: queryParams,
    data: body,
  });
};

const testContext = () => {
  console.log('hiiiiiii');
};

export const RestfulApiContext = React.createContext(null);

export const RestfulApiProvider = (props) => {
  return (
    <RestfulApiContext.Provider value={{ postLogin, postRefresh, testContext }}>
      {props.children}
    </RestfulApiContext.Provider>
  );
};
