import { useState } from 'react';

import Hero, {
  type HeroSearchValues,
} from '../../components/marketing/Hero';

import EstateLoader from '../../components/ui/EstateLoader';

import { useGetPropertiesQuery } from '../../features/properties/propertiesApi';
import { featuredProperty } from '../../features/properties/featuredProperty';
import PropertyGrid from '../../features/properties/PropertyGrid';

const HomePage = () => {
  const [filters, setFilters] =
    useState<HeroSearchValues>({
      city: '',
      purpose: 'SALE',
      propertyType: '',
    });

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPropertiesQuery({
    page: 1,
    limit: 6,
    city: filters.city || undefined,
    purpose: filters.purpose || undefined,
    propertyType:
      filters.propertyType || undefined,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });

  const handleSearch = (values: HeroSearchValues) => {
    setFilters(values);
  };

  return (
    <>
      <Hero
        property={featuredProperty}
        onSearch={handleSearch}
      />

      <main>
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Explore
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Properties worth discovering
                </h2>

                <p className="mt-3 max-w-2xl text-slate-500">
                  Explore properties selected for buyers and
                  renters looking for their next place.
                </p>
              </div>

              {isFetching && !isLoading && (
                <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
                  Updating results
                </div>
              )}
            </div>

            {isLoading ? (
              <EstateLoader />
            ) : isError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
                <h3 className="text-lg font-semibold text-red-900">
                  We couldn't load the properties
                </h3>

                <p className="mt-2 text-sm text-red-700">
                  Something went wrong while fetching the
                  latest listings.
                </p>

                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-5 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Try again
                </button>
              </div>
            ) : (
              <PropertyGrid
                properties={data?.data ?? []}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;