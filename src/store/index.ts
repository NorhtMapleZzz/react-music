import { configureStore } from '@reduxjs/toolkit';
import recommendReducer from './reducer';

const store = configureStore({
  reducer: {
    recommend: recommendReducer
  },
  // devTools: process.env.
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store