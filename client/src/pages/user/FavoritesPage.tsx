import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router';

import EstateLoader from '../../components/ui/EstateLoader';
import PropertyCard from '../../features/properties/PropertyCard';
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from '../../features/favorites/favoriteApi';

const FavoritesPage = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetFavoritesQuery();

  const [
    removeFavorite,
    { isLoading: isRemoving },
  ] = useRemoveFavoriteMutation();

  const favorites = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const handleRemove = async (
    propertyId: string,
  ) => {
    try {
      await removeFavorite(propertyId).unwrap();
    } catch {
      // RTK Query handles the request error.
    }
  };

  if (isLoading) {
    return <EstateLoader />;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Heart
                  className="h-4 w-4"
                  fill="currentColor"
                />
                Saved properties
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Your favorites
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Keep track of properties you are interested
                in and come back to them whenever you are ready.
              </p>
            </div>

            <Link
              to="/properties"
              className="hidden shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:inline-flex"
            >
              <Search className="h-4 w-4" />
              Browse properties
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-red-900">
              We couldn't load your favorites
            </h2>

            <p className="mt-2 text-sm text-red-700">
              Something went wrong while loading your saved
              properties.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        ) : favorites.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Heart
                className="h-7 w-7"
                strokeWidth={1.7}
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              No saved properties yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              When you find a property you love, save it here
              so you can easily come back to it later.
            </p>

            <Link
              to="/properties"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Search className="h-4 w-4" />
              Explore properties
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">
                  {total}
                </span>{' '}
                {total === 1
                  ? 'saved property'
                  : 'saved properties'}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="relative"
                >
                  <PropertyCard
                    property={favorite.property}
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    disabled={isRemoving}
                    onClick={() =>
                      handleRemove(
                        favorite.propertyId,
                      )
                    }
                    aria-label={`Remove ${favorite.property.title} from favorites`}
                    className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Heart
                      className="h-4 w-4"
                      fill="currentColor"
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center sm:hidden">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
              >
                <Search className="h-4 w-4" />
                Browse more properties
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default FavoritesPage;