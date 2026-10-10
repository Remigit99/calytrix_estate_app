import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../../app/store';

import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from './favoriteApi';

export const usePropertyFavorite = (
  propertyId: string,
) => {
  const accessToken = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const {
    data,
    isLoading: isFavoritesLoading,
  } = useGetFavoritesQuery(undefined, {
    skip: !accessToken,
  });

  const [
    addFavorite,
    { isLoading: isAdding },
  ] = useAddFavoriteMutation();

  const [
    removeFavorite,
    { isLoading: isRemoving },
  ] = useRemoveFavoriteMutation();

  const isFavorite = useMemo(
    () =>
      data?.data.some(
        (favorite) =>
          favorite.propertyId === propertyId,
      ) ?? false,
    [data, propertyId],
  );

  const toggleFavorite = async () => {
    if (!accessToken) {
      return;
    }

    if (isFavorite) {
      await removeFavorite(propertyId).unwrap();
      return;
    }

    await addFavorite(propertyId).unwrap();
  };

  return {
    isFavorite,
    toggleFavorite,
    isLoading:
      isFavoritesLoading ||
      isAdding ||
      isRemoving,
    isAuthenticated: Boolean(accessToken),
  };
};