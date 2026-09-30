import { api } from '../../lib/api/api';
import type {
  PropertyListResponse,
} from './propertyTypes';

export type GetPropertiesParams = {
  page?: number;
  limit?: number;
  search?: string;
  purpose?: string;
  propertyType?: string;
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export const propertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<
      PropertyListResponse,
      GetPropertiesParams | void
    >({
      query: (params) => ({
        url: '/properties',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((property) => ({
                type: 'Property' as const,
                id: property.id,
              })),
              { type: 'Property' as const, id: 'LIST' },
            ]
          : [{ type: 'Property' as const, id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
} = propertyApi;