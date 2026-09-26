import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import type { RootState } from '../../app/store';
import { clearSession, setCredentials, setAccessToken } from '../../features/auth/authSlice';

const baseUrl =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000/api/v1';

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',

  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    const accessToken = state.auth.accessToken;

    if (accessToken) {
      headers.set(
        'Authorization',
        `Bearer ${accessToken}`,
      );
    }

    headers.set('Accept', 'application/json');

    return headers;
  },
});


const isRefreshRequest = (
  args: string | FetchArgs,
) => {
  if (typeof args === 'string') {
    return args === '/auth/refresh';
  }

  return args.url === '/auth/refresh';
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(
    args,
    api,
    extraOptions,
  );

  if (
    result.error?.status !== 401 ||
    isRefreshRequest(args)
  ) {
    return result;
  }

  const refreshResult = await rawBaseQuery(
    {
      url: '/auth/refresh',
      method: 'POST',
    },
    api,
    extraOptions,
  );

  if (refreshResult.data) {
    const data = refreshResult.data as {
      accessToken: string;
    };

    api.dispatch(
      setAccessToken(data.accessToken),
    );

    result = await rawBaseQuery(
      args,
      api,
      extraOptions,
    );

    return result;
  }

  api.dispatch(clearSession());

  return result;
};