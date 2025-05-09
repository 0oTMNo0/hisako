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

// const GeminiKey = 'AIzaSyAs3aXFRBfhYveosTQfyB9VWIXuVnFtph8';

const getAssessTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem('refreshToken');
};

const setAssessTokenToLocalStorage = (token: string) => {
  localStorage.setItem('accessToken', token);
};

const setRefreshTokenToLocalStorage = (token: string) => {
  localStorage.setItem('refreshToken', token);
};

const handleTokenExist = async (): Promise<boolean> => {
  try {
    // console.log('Checking token existence...');
    const token = localStorage.getItem('refreshToken');
    if (token) {
      // console.log('No refresh token found');
      console.log('Refreshing token...');
      const response: any = await postTokenRefresh({}, {}, { refresh: token });
      console.log('Response:', response);
      const { access } = response.data;
      setAssessTokenToLocalStorage(access);
      // console.log('Token refreshed successfully');
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    // console.error('Error during token refresh:', error);
    return false;
  }
};

/**
 * Build the prompt for Gemini by injecting the user's request.
 */
const buildGeminiPrompt = (userText: string): string => {
  return `
you are a helpful assistant in a clothing website which you gonna help other API to find best products for user.
You have the following available colour: BrandA, BrandB, BrandC.
You have the following product subcategory: T-shirt, Pants, Shoes, Jacket.
you have the following product usage: Casual, Formal, Sports.
you have the following sort: "price", "-price", "created", "-created"
you have price_min (decimal) and price_max (decimal) for each product. 
User request: "${userText}"

Generate and return a JSON object suitable as query parameters for the getProducts API. The JSON should include only the relevant keys (e.g., "brand" and/or "type") with values derived from the user request. For example:
{
  "colour": "BrandA",
  "subcategory": "T-shirt",
  "usage": "Casual",
  "sort": "price",
  "price_min": 10.0,
  "price_max": 100.0
}

Do not include any other keys or explanations; return only the JSON object.
`;
};

const postLogin: IServiceCall = (queryParams, pathParams, body) => {
  //done
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

const postRegister: IServiceCall = (queryParams, pathParams, body) => {
  //done
  console.log('33333', body);
  return axios({
    method: POST,
    url: BASE_URL + `/api/auth/register/`,
    headers: { 'Content-Type': 'application/json' },
    params: queryParams,
    data: body,
  });
};

const postTokenRefresh: IServiceCall = (queryParams, pathParams, body) => {
  return axios({
    method: POST,
    url: BASE_URL + `/api/auth/token/refresh/`,
    headers: { 'Content-Type': 'application/json' },
    params: queryParams,
    data: body,
  });
};

const getProducts: IServiceCall = (queryParams, pathParams, body) => {
  console.log('1111111', getAssessTokenFromLocalStorage());
  console.log('2222222', pathParams, pathParams, body);
  return axios({
    method: GET,
    url: BASE_URL + `/api/products/`,
    headers: {
      Authorization: `Bearer ` + getAssessTokenFromLocalStorage(),
    },
    params: queryParams,
  });
};

// const getProduct: IServiceCall = (queryParams, pathParams, body) => {
//   return axios({
//     method: GET,
//     // url: BASE_URL + `/products/${pathParams.id}/`,
//     url: BASE_URL + `/products/3/`,
//     headers: {
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NTM0MDIxLCJpYXQiOjE3NDY1MzIwMDgsImp0aSI6IjAxNjk2YzQyZGM5YTRhN2JiY2U3ZjE0ODM5YjVmOThjIiwidXNlcl9pZCI6OX0.KNyD_rohAlXVP2f_hJu8jAA6gzQWCNbefT1tqhW0pOo"`,
//     },
//     params: queryParams,
//   });
// };

// Call Google Gemini generative model to generate structured JSON
const postGeminiContent: IServiceCall = (queryParams, pathParams, body) => {
  return axios({
    method: POST,
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GeminiKey}`,
    headers: { 'Content-Type': 'application/json' },
    params: queryParams,
    data: body,
  });
};

export const RestfulApiContext = React.createContext<any | null>(null);

export const RestfulApiProvider = (props: any) => {
  return (
    <RestfulApiContext.Provider
      value={{
        postRegister,
        postLogin,
        postRefresh,
        postTokenRefresh,
        getProducts,
        // getProduct,
        postGeminiContent,
        buildGeminiPrompt,
        getAssessTokenFromLocalStorage,
        getRefreshTokenFromLocalStorage,
        setAssessTokenToLocalStorage,
        setRefreshTokenToLocalStorage,
        handleTokenExist,
      }}
    >
      {props.children}
    </RestfulApiContext.Provider>
  );
};
