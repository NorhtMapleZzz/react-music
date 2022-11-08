import axios from 'axios';

export const baseURL = '/api'

export const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.response.use(
  response => response.data,
  err => {
    console.log(err, '网络错误');
  }
)