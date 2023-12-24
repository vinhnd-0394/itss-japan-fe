import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://itss2-japan.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
