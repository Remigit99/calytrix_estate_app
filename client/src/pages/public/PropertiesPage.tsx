import { useMemo } from 'react';
import {
    //   ChevronDown,
    Filter,
    Search,
    X,
} from 'lucide-react';
import {
    useSearchParams,
} from 'react-router';

import PropertyGrid from '../../features/properties/PropertyGrid';
import {
    useGetPropertiesQuery,
    type GetPropertiesParams,
} from '../../features/properties/propertiesApi';

import type {
    PropertyPurpose,
    PropertyType,
    PropertyAvailability,
} from '../../features/properties/propertyTypes';

const propertyTypeOptions: {
    value: PropertyType;
    label: string;
}[] = [
        { value: 'APARTMENT', label: 'Apartment' },
        { value: 'HOUSE', label: 'House' },
        { value: 'DUPLEX', label: 'Duplex' },
        { value: 'VILLA', label: 'Villa' },
        { value: 'LAND', label: 'Land' },
        { value: 'OFFICE', label: 'Office' },
        { value: 'SHOP', label: 'Shop' },
        { value: 'WAREHOUSE', label: 'Warehouse' },
        { value: 'OTHER', label: 'Other' },
    ];

const availabilityOptions: {
    value: PropertyAvailability;
    label: string;
}[] = [
        { value: 'AVAILABLE', label: 'Available' },
        { value: 'SOLD', label: 'Sold' },
        { value: 'RENTED', label: 'Rented' },
    ];

const PropertiesPage = () => {
    const [searchParams, setSearchParams] =
        useSearchParams();


    const page = Number(searchParams.get('page') ?? '1');

    const filters = useMemo<GetPropertiesParams>(() => {
        const purpose = searchParams.get('purpose');
        const propertyType = searchParams.get('propertyType');
        const availability =
            searchParams.get('availability');

        return {
            page,
            limit: 12,
            search: searchParams.get('search') || undefined,
            purpose:
                purpose === 'SALE' || purpose === 'RENT'
                    ? (purpose as PropertyPurpose)
                    : undefined,
            propertyType:
                propertyType &&
                    propertyTypeOptions.some(
                        (item) => item.value === propertyType,
                    )
                    ? (propertyType as PropertyType)
                    : undefined,
            city: searchParams.get('city') || undefined,
            state: searchParams.get('state') || undefined,
            minPrice: searchParams.get('minPrice')
                ? Number(searchParams.get('minPrice'))
                : undefined,
            maxPrice: searchParams.get('maxPrice')
                ? Number(searchParams.get('maxPrice'))
                : undefined,
            bedrooms: searchParams.get('bedrooms')
                ? Number(searchParams.get('bedrooms'))
                : undefined,
            bathrooms: searchParams.get('bathrooms')
                ? Number(searchParams.get('bathrooms'))
                : undefined,
            availability:
                availability === 'AVAILABLE' ||
                    availability === 'SOLD' ||
                    availability === 'RENTED'
                    ? (availability as PropertyAvailability)
                    : undefined,
            sortBy:
                searchParams.get('sortBy') || 'createdAt',
            sortOrder:
                searchParams.get('sortOrder') === 'asc'
                    ? 'asc'
                    : 'desc',
        };
    }, [searchParams, page]);

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetPropertiesQuery(filters);


    const updateParams = (
        updates: Record<string, string | number | null>,
    ) => {
        const next = new URLSearchParams(searchParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (
                value === null ||
                value === '' ||
                value === undefined
            ) {
                next.delete(key);
            } else {
                next.set(key, String(value));
            }
        });

        if (!('page' in updates)) {
            next.set('page', '1');
        }

        setSearchParams(next);
    };

    const handleSearch = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const searchValue = String(
            formData.get('search') ?? '',
        ).trim();

        updateParams({
            search: searchValue,
            page: 1,
        });
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    const hasFilters =
        Boolean(searchParams.get('search')) ||
        Boolean(searchParams.get('purpose')) ||
        Boolean(searchParams.get('propertyType')) ||
        Boolean(searchParams.get('city')) ||
        Boolean(searchParams.get('state')) ||
        Boolean(searchParams.get('minPrice')) ||
        Boolean(searchParams.get('maxPrice')) ||
        Boolean(searchParams.get('bedrooms')) ||
        Boolean(searchParams.get('bathrooms')) ||
        Boolean(searchParams.get('availability'));

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                            Properties
                        </p>

                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                            Find your next place
                        </h1>

                        <p className="mt-4 text-base leading-7 text-slate-500">
                            Browse properties for sale and rent and
                            narrow your search using the filters below.
                        </p>
                    </div>

                    {/* Search */}
                    <form
                        onSubmit={handleSearch}
                        className="mt-8 flex max-w-3xl gap-2"
                    >
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="search"
                                name="search"
                                defaultValue={searchParams.get('search') ?? ''}
                                placeholder="Search properties..."
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="h-12 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </section>

            {/* Results */}
            <section>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Toolbar */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                {data?.meta.total ?? 0} properties found
                            </p>

                            {isFetching && !isLoading && (
                                <p className="mt-1 text-xs font-medium text-indigo-600">
                                    Updating results...
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {/* Purpose */}
                            <select
                                value={
                                    searchParams.get('purpose') ?? ''
                                }
                                onChange={(event) =>
                                    updateParams({
                                        purpose: event.target.value,
                                    })
                                }
                                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
                            >
                                <option value="">Any purpose</option>
                                <option value="SALE">For sale</option>
                                <option value="RENT">For rent</option>
                            </select>

                            {/* Property type */}
                            <select
                                value={
                                    searchParams.get('propertyType') ?? ''
                                }
                                onChange={(event) =>
                                    updateParams({
                                        propertyType: event.target.value,
                                    })
                                }
                                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
                            >
                                <option value="">Any property</option>

                                {propertyTypeOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            {/* Sort */}
                            <select
                                value={
                                    `${searchParams.get('sortBy') ?? 'createdAt'}:${searchParams.get('sortOrder') ?? 'desc'}`
                                }
                                onChange={(event) => {
                                    const [sortBy, sortOrder] =
                                        event.target.value.split(':');

                                    updateParams({
                                        sortBy,
                                        sortOrder,
                                    });
                                }}
                                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
                            >
                                <option value="createdAt:desc">
                                    Newest
                                </option>

                                <option value="price:asc">
                                    Price: low to high
                                </option>

                                <option value="price:desc">
                                    Price: high to low
                                </option>
                            </select>

                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                >
                                    <X size={15} />
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Advanced filters */}
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="mb-5 flex items-center gap-2">
                            <Filter
                                size={18}
                                className="text-indigo-600"
                            />

                            <h2 className="text-sm font-semibold text-slate-900">
                                Refine your search
                            </h2>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {/* City */}
                            <label className="block">
                                <span className="text-xs font-medium text-slate-500">
                                    City
                                </span>

                                <input
                                    type="text"
                                    value={searchParams.get('city') ?? ''}
                                    onChange={(event) =>
                                        updateParams({
                                            city: event.target.value,
                                        })
                                    }
                                    placeholder="e.g. Lagos"
                                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </label>

                            {/* State */}
                            <label className="block">
                                <span className="text-xs font-medium text-slate-500">
                                    State
                                </span>

                                <input
                                    type="text"
                                    value={searchParams.get('state') ?? ''}
                                    onChange={(event) =>
                                        updateParams({
                                            state: event.target.value,
                                        })
                                    }
                                    placeholder="e.g. Lagos"
                                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </label>

                            {/* Bedrooms */}
                            <label className="block">
                                <span className="text-xs font-medium text-slate-500">
                                    Minimum bedrooms
                                </span>

                                <select
                                    value={
                                        searchParams.get('bedrooms') ?? ''
                                    }
                                    onChange={(event) =>
                                        updateParams({
                                            bedrooms: event.target.value,
                                        })
                                    }
                                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">Any</option>
                                    {[1, 2, 3, 4, 5, 6].map((value) => (
                                        <option key={value} value={value}>
                                            {value}+
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* Bathrooms */}
                            <label className="block">
                                <span className="text-xs font-medium text-slate-500">
                                    Minimum bathrooms
                                </span>

                                <select
                                    value={
                                        searchParams.get('bathrooms') ?? ''
                                    }
                                    onChange={(event) =>
                                        updateParams({
                                            bathrooms: event.target.value,
                                        })
                                    }
                                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">Any</option>
                                    {[1, 2, 3, 4, 5, 6].map((value) => (
                                        <option key={value} value={value}>
                                            {value}+
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* Min price */}
                            <label className="block">
                                <span className="text-xs font-medium text-slate-500">
                                    Minimum price
                                </span>

                                <input
                                    type="number"
                                    min="0"
                                    value={
                                        searchParams.get('minPrice') ?? ''
                                    }
                                    onChange={(event) =>
                                        updateParams({
                                            minPrice: event.target.value,
                                        })
                                    }
                                    placeholder="₦0"
                                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </label>

                            {/* Max price */}
                            <label className="block">
                                <span className="text-xs font-medium text-slate-500">
                                    Maximum price
                                </span>

                                <input
                                    type="number"
                                    min="0"
                                    value={
                                        searchParams.get('maxPrice') ?? ''
                                    }
                                    onChange={(event) =>
                                        updateParams({
                                            maxPrice: event.target.value,
                                        })
                                    }
                                    placeholder="₦500000000"
                                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </label>

                            {/* Availability */}
                            <label className="block">
                                <span className="text-xs font-medium text-slate-500">
                                    Availability
                                </span>

                                <select
                                    value={
                                        searchParams.get('availability') ?? ''
                                    }
                                    onChange={(event) =>
                                        updateParams({
                                            availability: event.target.value,
                                        })
                                    }
                                    className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="">Any</option>

                                    {availabilityOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>

                    {/* Properties */}
                    <div className="relative mt-8">
                        {isLoading ? (
                            <div className="flex min-h-105 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                                <div className="text-center">
                                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />

                                    <p className="mt-4 text-sm font-medium text-slate-600">
                                        Finding properties...
                                    </p>
                                </div>
                            </div>
                        ) : isError ? (
                            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center">
                                <h3 className="text-lg font-semibold text-red-900">
                                    We couldn't load these properties
                                </h3>

                                <p className="mt-2 text-sm text-red-700">
                                    Please try again.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => refetch()}
                                    className="mt-5 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
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

                    {/* Pagination */}
                    {data && data.meta.totalPages > 1 && (
                        <div className="mt-10 flex items-center justify-center gap-2">
                            <button
                                type="button"
                                disabled={page <= 1}
                                onClick={() =>
                                    updateParams({ page: page - 1 })
                                }
                                className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>

                            <span className="px-3 text-sm text-slate-500">
                                Page {page} of {data.meta.totalPages}
                            </span>

                            <button
                                type="button"
                                disabled={page >= data.meta.totalPages}
                                onClick={() =>
                                    updateParams({ page: page + 1 })
                                }
                                className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default PropertiesPage;