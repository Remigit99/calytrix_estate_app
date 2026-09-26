import { api } from '../../lib/api/api';
import type {
  PaginatedProperties,
  Property,
  PropertyQuery,
} from '../../types/api';

export const propertiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<
      PaginatedProperties,
      PropertyQuery | void
    >({
      query: (params) => ({
        url: '/properties',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Property' as const,
                id,
              })),
              { type: 'Property' as const, id: 'LIST' },
            ]
          : [{ type: 'Property' as const, id: 'LIST' }],
    }),

    getProperty: builder.query<Property, string>({
      query: (id) => `/properties/${id}`,
      providesTags: (_result, _error, id) => [
        { type: 'Property', id },
      ],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
} = propertiesApi;