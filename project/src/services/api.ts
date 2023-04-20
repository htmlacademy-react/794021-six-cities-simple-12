import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from 'src/consts/api';
import { getToken } from 'src/services/token';

const TokenHeaderName = 'x-token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers[TokenHeaderName] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse<void, void>) => response,

    (error: AxiosError<{error: string}>) => {
      throw error;
    },
  );

  return api;
};
