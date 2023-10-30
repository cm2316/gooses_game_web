import { message } from 'antd';
import axios from 'axios';
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  // withCredentials: true,
  timeout: 10000,
  headers: {},
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          message.error(err.response.data.message[0]);
          break;
        case 401:
        case 403:
        case 500:
          message.error(err.response.data.message);
          break;
        default:
          message.error('System error, please try again later.');
      }
    } else {
      message.error('Network error, please try again later.');
    }
    return Promise.reject(err);
  },
);

export default instance;
