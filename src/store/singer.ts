import { fetchHotSingerList, fetchSingerList } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface singerState {
  singerList: any[]
  enterLoading: boolean,     //控制进场Loading
  pullUpLoading: boolean,   //控制上拉加载动画
  pullDownLoading: boolean, //控制下拉加载动画
  pageCount: 0,            //这里是当前页数，我们即将实现分页功能
  hasMore: boolean
}

const initialState: singerState = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0,
  hasMore: true
}

export const getHotSingerList = createAsyncThunk('fetchHotSingerList', 
  async (_, thunkAPI) => {
    // console.log(thunkAPI.getState());
    const { singer: state } = thunkAPI.getState() as {singer: singerState}
    // const state = singerSlice.getInitialState()
    return await fetchHotSingerList(state.pageCount)
  }
)

export const getSingerList = createAsyncThunk('fetchSingerList', 
  async ({category, alpha}: {
    category: string,
    alpha: string
  }, thunkAPI) => {
    const { singer: state } = thunkAPI.getState() as {singer: singerState}
    return await fetchSingerList(category, alpha, state.pageCount)
  }
)

export const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {
    setPageCount(state, action) {
      state.pageCount = action.payload
    },
    setEnterLoading(state, action) {
      state.enterLoading = action.payload
    },
    setPullUpLoading(state, action) {
      state.pullUpLoading = action.payload
    },
    setPullDownLoading(state, action) {
      state.pullDownLoading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotSingerList.pending, (state) => {
        // pending状态没法确定到底是那个loading
      })
      .addCase(getHotSingerList.fulfilled, (state, action) => {
        const { artists, more } = action.payload as any
        if (state.pageCount === 0) {
          state.singerList = artists
        } else {
          state.singerList = [...state.singerList, ...artists]
          console.log(state.singerList);
        }
        state.hasMore = more

        state.enterLoading = false
        state.pullDownLoading = false
        state.pullUpLoading = false
      })
      .addCase(getHotSingerList.rejected, (state, action) => {
        state.enterLoading = false
        state.pullDownLoading = false
        state.pullUpLoading = false
        console.log('热门歌手数据获取失败', action.error);
      })
      .addCase(getSingerList.pending, (state) => {

      })
      .addCase(getSingerList.fulfilled, (state, action) => {
        const { artists, more } = action.payload as any
        if (state.pageCount === 0) {
          state.singerList = artists
        } else {
          console.log(state.pageCount);
          
          state.singerList = [...state.singerList, ...artists]
        }
        state.hasMore = more

        state.enterLoading = false
        state.pullDownLoading = false
        state.pullUpLoading = false
      })
      .addCase(getSingerList.rejected, (state, action) => {
        state.enterLoading = false
        state.pullDownLoading = false
        state.pullUpLoading = false
        console.log('歌手数据获取失败', action.error);
      })
  }
})

export default singerSlice.reducer