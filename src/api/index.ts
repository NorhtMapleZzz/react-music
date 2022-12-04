import { categoryMap } from './config';
import { axiosInstance } from './request';

export const fetchBannerList = () => {
  return axiosInstance.get('/banner')
}

export const fetchRecommendList = () => {
  return axiosInstance.get('/personalized');
}

export const fetchHotSingerList = (count: number) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const fetchSingerList = (category, alpha, count) => {
  const { 
    type, 
    area
  } = !!category ? categoryMap.get(category) : { type: 0, area: 0 }
  return axiosInstance.get(`/artist/list?${
    type ? `type=${type}&area=${area}` : ''
    }&initial=${alpha.toLowerCase()}&offset=${count}`
  )
}