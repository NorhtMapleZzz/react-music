import { axiosInstance } from './request';

export const fetchBannerList = () => {
  return axiosInstance.get('/banner')
}

export const fetchRecommendList = () => {
  return axiosInstance.get('/personalized');
}