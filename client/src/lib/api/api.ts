import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQuery';

export const api = createApi({
  reducerPath: 'api',

  baseQuery: baseQueryWithReauth,

  tagTypes: [
    'Auth',
    'Property',
    'Favorite',
    'Inquiry',
    'User',
    'Admin',
  ],

  endpoints: () => ({}),
});