
import {
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
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

type HeroProps = {
  property: HeroProperty;
};

const Hero = ({ property }: HeroProps) => {
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

                      <button
                        type="button"
                        className="mt-1 flex max-w-full items-center gap-1 text-sm font-medium text-(--color-text)"
                      >
                        <span className="truncate">
                          Anywhere
                        </span>
                        <ChevronDown size={14} />
                      </button>
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

                      <button
                        type="button"
                        className="mt-1 flex items-center gap-1 text-sm font-medium text-(--color-text)"
                      >
                        Buy
                        <ChevronDown size={14} />
                      </button>
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

                      <button
                        type="button"
                        className="mt-1 flex items-center gap-1 text-sm font-medium text-(--color-text)"
                      >
                        Any type
                        <ChevronDown size={14} />
                      </button>
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

                      <button
                        type="button"
                        className="mt-1 flex items-center gap-1 text-sm font-medium text-(--color-text)"
                      >
                        Any price
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="col-span-2 p-2 lg:col-span-1">
                    <Button
                      size="lg"
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

