import { ArrowRight, SlidersHorizontal } from 'lucide-react';

import Hero from '../../components/marketing/Hero';
import EstateLoader from '../../components/ui/EstateLoader';

import { useGetPropertiesQuery } from '../../features/properties/propertiesApi';
import { featuredProperty } from '../../features/properties/featuredProperty';
import PropertyGrid from '../../features/properties/PropertyGrid';

const HomePage = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetPropertiesQuery({
    page: 1,
    limit: 6,
  });

  return (
    <>
      <Hero property={featuredProperty} />

      <main>
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            {/* Section heading */}
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                  Explore properties
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Find a place that feels right
                </h2>

                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                  Explore carefully presented properties across locations and
                  price ranges that fit your needs.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Loading */}
            {isLoading && <EstateLoader />}

            {/* Error */}
            {isError && (
              <div className="flex min-h-[320px] items-center justify-center">
                <div className="max-w-md rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                    <span className="text-lg text-red-600">!</span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    We couldn't load the properties
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Something went wrong while fetching the latest listings.
                    Please try again.
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

            {/* Properties */}
            {data && !isLoading && !isError && (
              <>
                <PropertyGrid properties={data.data} />

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