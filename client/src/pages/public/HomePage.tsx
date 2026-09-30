import { useMemo, useState } from 'react';

import {
  ArrowRight,
  // SlidersHorizontal,
} from 'lucide-react';

import Hero from '../../components/marketing/Hero';
import EstateLoader from '../../components/ui/EstateLoader';

import {
  useGetPropertiesQuery,
} from '../../features/properties/propertiesApi';

import {
  type PropertyFilterValues,
  defaultPropertyFilters,
} from '../../features/properties/PropertyFilters';

import PropertyFilters from '../../features/properties/PropertyFilters';

import { featuredProperty } from '../../features/properties/featuredProperty';

import PropertyGrid from '../../features/properties/PropertyGrid';

import useDebouncedValue from '../../hooks/useDebouncedValue';

const HomePage = () => {
  const [filters, setFilters] =
    useState<PropertyFilterValues>(
      defaultPropertyFilters,
    );

  const debouncedSearch = useDebouncedValue(
    filters.search,
    400,
  );

  const queryParams = useMemo(
    () => ({
      page: 1,
      limit: 6,

      search: debouncedSearch || undefined,

      purpose:
        filters.purpose || undefined,

      propertyType:
        filters.propertyType || undefined,

      city:
        filters.city || undefined,

      minPrice:
        filters.minPrice
          ? Number(filters.minPrice)
          : undefined,

      maxPrice:
        filters.maxPrice
          ? Number(filters.maxPrice)
          : undefined,

      bedrooms:
        filters.bedrooms
          ? Number(filters.bedrooms)
          : undefined,

      sortBy:
        filters.sortBy || undefined,

      sortOrder:
        filters.sortBy
          ? filters.sortOrder
          : undefined,
    }),
    [filters, debouncedSearch],
  );

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPropertiesQuery(queryParams);

  const handleFilterChange = (
    key: keyof PropertyFilterValues,
    value: string,
  ) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(defaultPropertyFilters);
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => {
      if (key === 'sortOrder') {
        return false;
      }

      return Boolean(value);
    },
  );

  return (
    <>
      <Hero property={featuredProperty} />

      <main>
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

            {/* Heading */}
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                  Explore properties
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Find a place that feels right
                </h2>

                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                  Explore carefully presented properties
                  across locations and price ranges that fit
                  your needs.
                </p>
              </div>
            </div>

            {/* Filters */}
            <PropertyFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Results header */}
            {!isLoading && !isError && data && (
              <div className="mb-6 mt-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {data.meta.total === 1
                      ? '1 property'
                      : `${data.meta.total} properties`}
                  </p>
                </div>

                {isFetching && (
                  <div className="flex items-center gap-2 text-xs font-medium text-indigo-600">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-600" />
                    Updating results...
                  </div>
                )}
              </div>
            )}

            {/* Initial loading */}
            {isLoading && <EstateLoader />}

            {/* Error */}
            {isError && !isLoading && (
              <div className="flex min-h-[320px] items-center justify-center">
                <div className="max-w-md rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-950">
                    We couldn't load the properties
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Something went wrong while fetching the
                    latest listings. Please try again.
                  </p>

                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="mt-6 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {/* Results */}
            {data && !isLoading && !isError && (
              <>
                <div
                  className={
                    isFetching
                      ? 'opacity-60 transition-opacity duration-200'
                      : 'opacity-100 transition-opacity duration-200'
                  }
                >
                  <PropertyGrid
                    properties={data.data}
                  />
                </div>

                {data.meta.total > 0 && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      View all properties
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;