import { fetchBannerList, fetchRecommendList } from '@/api';
import type { RecommendListProps } from '@/components/RecommendList';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface recommendState {
  bannerList: {imageUrl: string}[]
  recommendList: RecommendListProps[]
  loading: boolean
}

const initialState: recommendState = {
  bannerList: [],
  recommendList: [],
  loading: false
}

export const getBannerList = createAsyncThunk('fetchBannerList',
  async () => {
    const res: any = await fetchBannerList()
    return res.banners
  }
)

export const getRecommendList = createAsyncThunk('fetchRecommendList',
  async () => {
    const res: any = await fetchRecommendList()
    return res.result
  }
)


export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getBannerList.pending, (state) => {
        state.loading = true
      })
      .addCase(getBannerList.fulfilled, (state, action) => {
        state.loading = false
        state.bannerList = action.payload
      })
      .addCase(getBannerList.rejected, (state, action) => {
        state.loading = false
        console.log('请求错误', action.error);
      })
      .addCase(getRecommendList.pending, (state) => {
        state.loading = true
      })
      .addCase(getRecommendList.fulfilled, (state, action) => {
        state.loading = false
        state.recommendList = action.payload
      })
      .addCase(getRecommendList.rejected, (state, action) => {
        state.loading = false
        console.log('请求错误', action.error);
      })
  }
})

export default recommendSlice.reducer