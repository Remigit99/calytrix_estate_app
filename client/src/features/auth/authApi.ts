import { api } from '../../lib/api/api';
import {
  clearSession,
  setAccessToken,
  setCredentials,
  setUser,
  setUnauthenticated,
} from './authSlice';
import type { AuthUser } from './authSlice';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};


type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

type RegisterResponse = {
  accessToken: string;
  user: AuthUser;
};

type RefreshResponse = {
  accessToken: string;
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({

    register: builder.mutation<
  RegisterResponse,
  RegisterRequest
>({
  query: (data) => ({
    url: '/auth/register',
    method: 'POST',
    body: data,
  }),

  async onQueryStarted(
    _data,
    { dispatch, queryFulfilled },
  ) {
    try {
      const { data } = await queryFulfilled;

      dispatch(
        setCredentials({
          accessToken: data.accessToken,
          user: data.user,
        }),
      );
    } catch {
      dispatch(clearSession());
    }
  },

  invalidatesTags: ['Auth'],
}),

    login: builder.mutation<
      LoginResponse,
      LoginRequest
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),

      async onQueryStarted(
        _credentials,
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } =
            await queryFulfilled;

          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              user: data.user,
            }),
          );
        } catch {
          dispatch(clearSession());
        }
      },

      invalidatesTags: ['Auth'],
    }),

    refresh: builder.mutation<
      RefreshResponse,
      void
    >({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),

    me: builder.query<AuthUser, void>({
      query: () => '/auth/me',

      providesTags: ['Auth'],

      async onQueryStarted(
        _arg,
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data } =
            await queryFulfilled;

          dispatch(setUser(data));
        } catch {
          dispatch(setUnauthenticated());
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),

      async onQueryStarted(
        _arg,
        { dispatch, queryFulfilled },
      ) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearSession());
        }
      },

      invalidatesTags: ['Auth'],
    }),

    initializeSession: builder.query<
  AuthUser,
  void
>({
  async queryFn(
    _arg,
    api,
    _extraOptions,
    baseQuery,
  ) {
    const refreshResult = await baseQuery({
      url: '/auth/refresh',
      method: 'POST',
    });

    if (refreshResult.error) {
      api.dispatch(setUnauthenticated());

      return {
        error: refreshResult.error,
      };
    }

    const refreshData =
      refreshResult.data as RefreshResponse;

    api.dispatch(
      setAccessToken(
        refreshData.accessToken,
      ),
    );

    const meResult = await baseQuery(
      '/auth/me',
    );

    if (meResult.error) {
      api.dispatch(clearSession());

      return {
        error: meResult.error,
      };
    }

    const user = meResult.data as AuthUser;

    api.dispatch(setCredentials({
      accessToken:
        refreshData.accessToken,
      user,
    }));

    return {
      data: user,
    };
  },

  providesTags: ['Auth'],
}),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useMeQuery,
  useLogoutMutation,
   useInitializeSessionQuery,
} = authApi;