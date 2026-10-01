import {
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

import { useState } from 'react';

import type {
  PropertyPurpose,
  PropertyType,
} from '../../features/properties/propertyTypes';
import { Link } from 'react-router';

import { Button, Container } from '../ui';

export type HeroProperty = {
  id: string;
  title: string;
  location: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
};

export type HeroSearchValues = {
  city: string;
  purpose: PropertyPurpose | '';
  propertyType: PropertyType | '';
  minPrice?: number;
  maxPrice?: number;
};

type HeroProps = {
  property: HeroProperty;
  onSearch?: (filters: HeroSearchValues) => void;
};

const Hero = ({ property, onSearch }: HeroProps) => {
  const [city, setCity] = useState('');
  const [purpose, setPurpose] =
    useState<PropertyPurpose | ''>('SALE');

  const [propertyType, setPropertyType] =
    useState<PropertyType | ''>('');

  const [minPrice, setMinPrice] =
    useState<number | undefined>();

  const [maxPrice, setMaxPrice] =
    useState<number | undefined>();

  const handleSearch = () => {
    onSearch?.({
      city: city.trim(),
      purpose,
      propertyType,
      minPrice,
      maxPrice,
    });
  };

  const propertyTypeLabel =
    propertyType === ''
      ? 'Any type'
      : propertyType.charAt(0) +
      propertyType.slice(1).toLowerCase();

  const priceLabel =
    minPrice === undefined && maxPrice === undefined
      ? 'Any price'
      : minPrice === undefined
        ? `Under ₦${maxPrice / 1_000_000}M`
        : maxPrice === undefined
          ? `₦${minPrice / 1_000_000}M+`
          : `₦${minPrice / 1_000_000}M – ₦${maxPrice / 1_000_000}M`;
  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-(--color-neutral-950) sm:min-h-[720px]">
      {/* Background */}
      <img
        src={property.imageUrl}
        alt={property.imageAlt}
        className="absolute inset-0 -z-30 size-full object-cover"
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 -z-20 bg-black/35" />

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-black/15 to-black/80" />

      <Container>
        <div className="relative min-h-[680px] sm:min-h-[720px]">
          {/* Hero copy */}
          <div className="flex max-w-3xl flex-col justify-center pt-32 sm:pt-40 lg:pt-44">
            <div className="flex items-center gap-3 text-caption font-medium uppercase tracking-[0.2em] text-white/75">
              <span className="h-px w-8 bg-white/60" />
              Exceptional properties
            </div>

            <h1 className="mt-5 max-w-3xl text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
              Find a place
              <br />
              worth calling home.
            </h1>

            <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-white/80">
              Discover thoughtfully selected properties in
              locations that matter to you.
            </p>
          </div>

          {/* Search area */}
          <div className="absolute inset-x-0 bottom-7 sm:bottom-8">
            <div className="mx-auto max-w-6xl">
              <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/95 shadow-[0_20px_60px_rgb(0_0_0_/_0.25)] backdrop-blur-xl">
                <div className="grid grid-cols-2 lg:flex lg:items-stretch">
                  {/* Location */}
                  <div className="flex min-h-[68px] items-center gap-3 border-b border-r border-(--color-border) px-4 py-3 sm:px-5 lg:min-w-[190px] lg:flex-1 lg:border-b-0">
                    <MapPin
                      size={19}
                      strokeWidth={1.8}
                      className="shrink-0 text-(--color-primary)"
                    />

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-(--color-text-muted)">
                        Location
                      </p>

                      <div className="relative mt-1">
                        <input
                          type="text"
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                          placeholder="Anywhere"
                          className="w-full bg-transparent pr-5 text-sm font-medium text-(--color-text) outline-none placeholder:text-(--color-text)"
                        />

                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="flex min-h-[68px] items-center gap-3 border-b border-(--color-border) px-4 py-3 sm:px-5 lg:min-w-[170px] lg:flex-1 lg:border-b-0 lg:border-r">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--color-primary-soft)">
                      <span className="size-1.5 rounded-full bg-(--color-primary)" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-(--color-text-muted)">
                        Purpose
                      </p>
                      <div className="relative mt-1">
                        <span className="text-sm font-medium text-(--color-text)">
                          {purpose === 'RENT' ? 'Rent' : 'Buy'}
                        </span>

                        <select
                          value={purpose}
                          onChange={(event) =>
                            setPurpose(event.target.value as PropertyPurpose)
                          }
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          aria-label="Property purpose"
                        >
                          <option value="SALE">Buy</option>
                          <option value="RENT">Rent</option>
                        </select>

                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property type */}
                  <div className="flex min-h-[68px] items-center gap-3 border-r border-(--color-border) px-4 py-3 sm:px-5 lg:min-w-[190px] lg:flex-1">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--color-neutral-100)">
                      <SlidersHorizontal
                        size={16}
                        strokeWidth={1.8}
                        className="text-(--color-text-secondary)"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-(--color-text-muted)">
                        Property
                      </p>

                      <div className="relative mt-1">
                        <span className="text-sm font-medium text-(--color-text)">
                          {propertyTypeLabel}
                        </span>

                        <select
                          value={propertyType}
                          onChange={(event) =>
                            setPropertyType(
                              event.target.value as PropertyType | '',
                            )
                          }
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          aria-label="Property type"
                        >
                          <option value="">Any type</option>
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

                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex min-h-[68px] items-center gap-3 border-b border-(--color-border) px-4 py-3 sm:px-5 lg:min-w-[170px] lg:flex-1 lg:border-b-0">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--color-neutral-100) text-sm font-semibold text-(--color-text-secondary)">
                      ₦
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-(--color-text-muted)">
                        Price
                      </p>

                      <div className="relative mt-1">
                        <span className="text-sm font-medium text-(--color-text)">
                          {priceLabel}
                        </span>

                        <select
                          value={
                            minPrice === undefined && maxPrice === undefined
                              ? ''
                              : minPrice === undefined
                                ? 'under50'
                                : minPrice === 50_000_000 &&
                                  maxPrice === 100_000_000
                                  ? '50to100'
                                  : minPrice === 100_000_000 &&
                                    maxPrice === 250_000_000
                                    ? '100to250'
                                    : '250plus'
                          }
                          onChange={(event) => {
                            const value = event.target.value;

                            if (value === '') {
                              setMinPrice(undefined);
                              setMaxPrice(undefined);
                            }

                            if (value === 'under50') {
                              setMinPrice(undefined);
                              setMaxPrice(50_000_000);
                            }

                            if (value === '50to100') {
                              setMinPrice(50_000_000);
                              setMaxPrice(100_000_000);
                            }

                            if (value === '100to250') {
                              setMinPrice(100_000_000);
                              setMaxPrice(250_000_000);
                            }

                            if (value === '250plus') {
                              setMinPrice(250_000_000);
                              setMaxPrice(undefined);
                            }
                          }}
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          aria-label="Price range"
                        >
                          <option value="">Any price</option>
                          <option value="under50">Under ₦50M</option>
                          <option value="50to100">₦50M – ₦100M</option>
                          <option value="100to250">₦100M – ₦250M</option>
                          <option value="250plus">₦250M+</option>
                        </select>

                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="col-span-2 p-2 lg:col-span-1">
                    <Button
                      size="lg"
                      onClick={handleSearch}
                      className="h-[52px] w-full rounded-xl px-7 lg:h-full lg:min-w-[120px]"
                    >
                      <Search size={19} />
                      <span>Search</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Featured property */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <Link
                  to={`/properties/${property.id}`}
                  className="group flex min-w-0 items-center gap-3 text-white"
                >
                  <span className="hidden h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-white/30 sm:block">
                    <img
                      src={property.imageUrl}
                      alt=""
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
                      Featured property
                    </span>

                    <span className="mt-0.5 block truncate text-sm font-medium text-white">
                      {property.title}
                      <span className="mx-2 text-white/40">·</span>
                      {property.location}
                    </span>
                  </span>
                </Link>

                <Link
                  to="/properties"
                  className="shrink-0 text-sm font-medium text-white/75 transition-colors hover:text-white"
                >
                  <span className="hidden sm:inline">
                    Explore properties
                  </span>
                  <span className="sm:hidden">Explore</span>
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;

