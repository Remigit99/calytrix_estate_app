import { api } from '../../lib/api/api';
import type { Property } from '../properties/propertyTypes';

export type Favorite = {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  property: Property;
};

export type FavoriteListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type FavoriteListResponse = {
  data: Favorite[];
  meta: FavoriteListMeta;
};

export const favoriteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<
      FavoriteListResponse,
      void
    >({
      query: () => '/users/me/favorites',

      providesTags: (result) =>
        result
          ? [
              ...result.data.map((favorite) => ({
                type: 'Favorite' as const,
                id: favorite.propertyId,
              })),
              {
                type: 'Favorite' as const,
                id: 'LIST',
              },
            ]
          : [
              {
                type: 'Favorite' as const,
                id: 'LIST',
              },
            ],
    }),

    addFavorite: builder.mutation<
      Favorite,
      string
    >({
      query: (propertyId) => ({
        url: `/properties/${propertyId}/favorite`,
        method: 'POST',
      }),

      invalidatesTags: (_result, _error, propertyId) => [
        {
          type: 'Favorite',
          id: propertyId,
        },
        {
          type: 'Favorite',
          id: 'LIST',
        },
      ],
    }),

    removeFavorite: builder.mutation<
      void,
      string
    >({
      query: (propertyId) => ({
        url: `/properties/${propertyId}/favorite`,
        method: 'DELETE',
      }),

      invalidatesTags: (_result, _error, propertyId) => [
        {
          type: 'Favorite',
          id: propertyId,
        },
        {
          type: 'Favorite',
          id: 'LIST',
        },
      ],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi;