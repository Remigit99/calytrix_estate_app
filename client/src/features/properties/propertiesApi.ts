import { api } from '../../lib/api/api';
import type {
  PropertyAvailability,
  PropertyListResponse,
  PropertyPurpose,
  PropertyType,
} from './propertyTypes';

export type GetPropertiesParams = {
  page?: number;
  limit?: number;
  search?: string;
  purpose?: PropertyPurpose;
  propertyType?: PropertyType;
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  availability?: PropertyAvailability
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
        params: params ?? undefined,
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

        getPropertyById: builder.query<Property, string>({
      query: (id) => `/properties/${id}`,

      providesTags: (_result, _error, id) => [
        { type: 'Property', id },
      ],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyByIdQuery
} = propertyApi;