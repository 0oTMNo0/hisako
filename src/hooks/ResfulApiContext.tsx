import React from 'react';
import axios from 'axios';
import {
  // DELETE,
  GET,
  POST,
  // PUT,
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
      // console.log('Response:', response);
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
  return `You are a service that _only_ builds filter JSON for a clothing API.
  Available filter fields (use exactly these keys and types):
    • "colour" (string: ['White', 'Black', 'Blue', 'Pink', 'Red', 'Olive', 'Yellow', 'Navy Blue', 'Magenta', 'Grey', 'Green', 'Orange', 'Purple', 'Turquoise Blue', 'Peach', 'Off White', 'Teal', 'Sea Green', 'Lime Green', 'Brown', 'Lavender', 'Beige', 'Khaki', 'Multi', 'Maroon', 'Cream', 'Rust', 'Grey Melange', 'Silver', 'Tan', 'Charcoal', 'Mushroom Brown', 'Copper', 'Gold', 'Bronze', 'Taupe', 'Metallic', 'Mustard', 'Nude'])
    • "subcategory" (string: 'Topwear', 'Bottomwear', 'Dress', 'Innerwear', 'Socks', 'Apparel Set', 'Shoes', 'Flip Flops', 'Sandal')
    • "usage" (string: 'Casual', 'Party', 'Formal', 'Sports
    • "sort" (string: "price", "-price", "created", or "-created")
    • "price_min" (number)
    • "price_max" (number)
    • "in_stock" (boolean)

  User request: "${userText}"

  **INSTRUCTIONS**
  • Your response must be _only_ a single JSON object (no markdown, no code fences, no explanation, no trailing commas).
  • Omit any key that does not apply.
  • Keys and values must match exactly the names and types above.

  **OUTPUT FORMAT EXAMPLE**
  {"colour":"White","subcategory":"Topwear","sort":"price","price_min":10.00,"price_max":100.00,"in_stock":true,"usage":"Casual"}

  Now produce the JSON for the request above.
  `.trim();
  //  return `Please analyze the following user text and return a JSON object based on these criteria:
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
  // console.log('33333', body);
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
  return axios({
    method: GET,
    url: BASE_URL + `/api/products/`,
    headers: {
      Authorization: `Bearer ` + getAssessTokenFromLocalStorage(),
    },
    params: queryParams,
    // data: body,
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
