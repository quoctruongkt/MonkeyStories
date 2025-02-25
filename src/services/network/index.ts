import axios from 'axios';

import {EApiType} from '@/constants';
import {useAppConfig} from '@/store';

const axiosInstance = (apiType: EApiType, suffix: string = '') => {
  const {baseUrls} = useAppConfig.getState();
  const baseURL = baseUrls[apiType];

  const instance = axios.create({
    baseURL: `${baseURL}${suffix}`,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use(config => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
};

const getToken = () => {
  return '';
};

export default axiosInstance;
