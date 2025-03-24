import React from 'react';
import axios from 'axios';
import {
  DELETE,
  GET,
  POST,
  PUT,
  BASE_URL,
  IServiceCall,
} from '@/constants/Global';

const postLogin: IServiceCall = (queryParams, pathParams, body) => {
  console.log('1111', body);
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

const postRefresh: IServiceCall = (queryParams, pathParams, body) => {
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

export const RestfulApiContext = React.createContext<any | null>(null);

export const RestfulApiProvider = (props: any) => {
  return (
    <RestfulApiContext.Provider value={{ postLogin, postRefresh, testContext }}>
      {props.children}
    </RestfulApiContext.Provider>
  );
};
