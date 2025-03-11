import React from 'react';
import axios from 'axios';
import { DELETE, GET, POST, PUT } from '../constants/Global';

const postLogin = (queryParams, pathParams, body) => {
  return axios({
    method: POST,
    url: `/api/v1/wallet/withdraw`,
    headers: {
      'Content-Type': 'application/json',
      Authentication: 'Bearer ' + '',
    },
    params: queryParams,
    data: body,
  });
};

export const RestfulApiContext = React.createContext(null);

export const RestfulApiProvider = (props) => {
  return (
    <RestfulApiContext.Provider value={{ postLogin }}>
      {props.children}
    </RestfulApiContext.Provider>
  );
};
