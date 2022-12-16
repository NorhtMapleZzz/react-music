import { fetchRankList } from "@/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface rankState {
  rankList: {imageUrl: string}[]
  loading: boolean
}

const initialState: rankState = {
  rankList: [],
  loading: false
}

export const getRankList = createAsyncThunk('fetchRankList',
  async () => {
    const res: any = await fetchRankList()
    return res.list
  }
)


export const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRankList.pending,  (state) => {
        state.loading = true
      })
      .addCase(getRankList.fulfilled, (state, action) => {
        state.loading = false
        state.rankList = action.payload
      })
      .addCase(getRankList.rejected, (state, action) => {
        state.loading = false
        console.log('请求错误', action.error);
      })
  }
})

export default rankSlice.reducer