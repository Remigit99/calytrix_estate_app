import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import { api } from '../lib/api/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;