import { AxiosPromise } from 'axios';

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';
const BASE_URL = 'http://127.0.0.1:8000';

export { DELETE, GET, POST, PUT, BASE_URL };

export type IAxiosRTKQueryRequest = {
  queryParams?: any;
  pathParams?: any;
  body?: any;
  options: {
    Authorization: 'ACCESS_TOKEN' | 'REFRESH_TOKEN' | 'NONE';
    ['Content-Type']?: string;
  };
};

export type IServiceCall = (x: any, y: any, z: any) => AxiosPromise<any>;
export type IAxiosThunkArg = { queryParams: any; pathParams: any; body: any };
export type IApiState = {
  isLoading: boolean;
  data: any;
  error: string | undefined;
};

export interface IProduct {
  colour: string;
  id: number;
  image: string;
  price: string;
  prod_title: string;
  subcategory: string;
  usage: string;
}
