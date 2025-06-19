// app/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice'; // Import reducer chính

const store = configureStore({
  reducer: {
    user: userReducer,
  }, // Cấu hình reducer chính
});

export type RootState = ReturnType<typeof store.getState>; // Lấy kiểu state từ store
export type AppDispatch = typeof store.dispatch; // Lấy kiểu dispatch từ store

export default store;
