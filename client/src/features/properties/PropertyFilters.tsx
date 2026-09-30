import {
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';

import type {
  PropertyPurpose,
  PropertyType,
} from './propertyTypes';

export type PropertyFilterValues = {
  search: string;
  purpose: PropertyPurpose | '';
  propertyType: PropertyType | '';
  city: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};


export const defaultPropertyFilters: PropertyFilterValues = {
  search: '',
  purpose: '',
  propertyType: '',
  city: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  sortBy: '',
  sortOrder: 'desc',
};

type PropertyFiltersProps = {
  filters: PropertyFilterValues;
  onChange: (
    key: keyof PropertyFilterValues,
    value: string,
  ) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
};



const PropertyFilters = ({
  filters,
  onChange,
  onReset,
  hasActiveFilters,
}: PropertyFiltersProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="search"
          value={filters.search}
          onChange={(event) =>
            onChange('search', event.target.value)
          }
          placeholder="Search by property, city or location..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      {/* Filters */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Purpose */}
        <select
          value={filters.purpose}
          onChange={(event) =>
            onChange('purpose', event.target.value)
          }
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="">Any purpose</option>
          <option value="SALE">For sale</option>
          <option value="RENT">For rent</option>
        </select>

        {/* Property type */}
        <select
          value={filters.propertyType}
          onChange={(event) =>
            onChange('propertyType', event.target.value)
          }
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="">Any property type</option>
          <option value="APARTMENT">Apartment</option>
          <option value="HOUSE">House</option>
          <option value="DUPLEX">Duplex</option>
          <option value="VILLA">Villa</option>
          <option value="LAND">Land</option>
          <option value="OFFICE">Office</option>
          <option value="SHOP">Shop</option>
          <option value="WAREHOUSE">Warehouse</option>
          <option value="OTHER">Other</option>
        </select>

        {/* City */}
        <input
          type="text"
          value={filters.city}
          onChange={(event) =>
            onChange('city', event.target.value)
          }
          placeholder="City"
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        />

        {/* Bedrooms */}
        <select
          value={filters.bedrooms}
          onChange={(event) =>
            onChange('bedrooms', event.target.value)
          }
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="">Any bedrooms</option>
          <option value="1">1+ bedroom</option>
          <option value="2">2+ bedrooms</option>
          <option value="3">3+ bedrooms</option>
          <option value="4">4+ bedrooms</option>
          <option value="5">5+ bedrooms</option>
        </select>
      </div>

      {/* Price + sorting */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="number"
          min="0"
          value={filters.minPrice}
          onChange={(event) =>
            onChange('minPrice', event.target.value)
          }
          placeholder="Minimum price"
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        />

        <input
          type="number"
          min="0"
          value={filters.maxPrice}
          onChange={(event) =>
            onChange('maxPrice', event.target.value)
          }
          placeholder="Maximum price"
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        />

        {/* Sort field */}
        <select
          value={filters.sortBy}
          onChange={(event) =>
            onChange('sortBy', event.target.value)
          }
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="">Sort by</option>
          <option value="createdAt">Newest</option>
          <option value="price">Price</option>
          <option value="bedrooms">Bedrooms</option>
        </select>

        {/* Sort order */}
        <select
          value={filters.sortOrder}
          onChange={(event) =>
            onChange(
              'sortOrder',
              event.target.value as 'asc' | 'desc',
            )
          }
          disabled={!filters.sortBy}
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Footer */}
      {hasActiveFilters && (
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters applied</span>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition hover:text-indigo-600"
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;