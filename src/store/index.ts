import { configureStore } from '@reduxjs/toolkit';
import recommendReducer from './recommend';
import singerReducer from "./singer";

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singer: singerReducer
  },
  // devTools: process.env.
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store