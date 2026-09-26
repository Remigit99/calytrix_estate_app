import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: 'USER' | 'AGENT' | 'ADMIN';
};

type AuthStatus =
  | 'initializing'
  | 'authenticated'
  | 'unauthenticated';

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  status: AuthStatus;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
  status: 'initializing',
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {

        setAccessToken: (
  state,
  action: PayloadAction<string>,
) => {
  state.accessToken = action.payload;
},
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: AuthUser;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = 'authenticated';
    },

    setUser: (
      state,
      action: PayloadAction<AuthUser>,
    ) => {
      state.user = action.payload;
      state.status = 'authenticated';
    },

    setAuthenticated: (state) => {
      state.status = 'authenticated';
    },

    setUnauthenticated: (state) => {
      state.accessToken = null;
      state.user = null;
      state.status = 'unauthenticated';
    },

    clearSession: (state) => {
      state.accessToken = null;
      state.user = null;
      state.status = 'unauthenticated';
    },


  },
});

export const {
  setAccessToken,
  setCredentials,
  setUser,
  setAuthenticated,
  setUnauthenticated,
  clearSession,
} = authSlice.actions;

export default authSlice.reducer;