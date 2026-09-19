
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
    <section className="relative isolate min-h-[720px] overflow-hidden bg-(--color-neutral-950)">
      {/* Background image */}
      <img
        src={property.imageUrl}
        alt={property.imageAlt}
        className="absolute inset-0 -z-20 size-full object-center"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 -z-10 bg-black/35" />

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/55 via-black/20 to-black/75" />

      <Container>
        <div className="flex min-h-[720px] flex-col justify-center pb-36 pt-28">
          {/* Hero content */}
          <div className="max-w-3xl text-white">
            <p className="mb-5 flex items-center gap-2 text-caption font-medium uppercase tracking-[0.18em] text-white/70">
              <span className="h-px w-8 bg-white/60" />
              Exceptional properties
            </p>

            <h1 className="max-w-3xl text-display text-white">
              Find a place worth calling home.
            </h1>

            <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-white/80">
              Discover thoughtfully selected properties in
              locations that matter to you.
            </p>
          </div>

          {/* Search panel */}
          <div className="absolute inset-x-0 bottom-8">
            <Container>
              <div className="overflow-hidden rounded-(--radius-panel) border border-white/20 bg-white/95 shadow-(--shadow-lg) backdrop-blur-md">
                <div className="flex flex-col lg:flex-row lg:items-stretch">
                  {/* Location */}
                  <div className="flex min-h-20 flex-1 items-center gap-3 border-b border-(--color-border) px-5 py-4 lg:border-b-0 lg:border-r">
                    <MapPin
                      size={20}
                      className="shrink-0 text-(--color-primary)"
                    />

                    <div className="min-w-0">
                      <p className="text-caption font-medium uppercase tracking-wide text-(--color-text-muted)">
                        Location
                      </p>

                      <button
                        type="button"
                        className="mt-1 flex items-center gap-1 text-body-sm font-medium text-(--color-text)"
                      >
                        Anywhere
                        <ChevronDown size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="flex min-h-20 flex-1 items-center gap-3 border-b border-(--color-border) px-5 py-4 lg:border-b-0 lg:border-r">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--color-primary-soft)">
                      <span className="size-2 rounded-full bg-(--color-primary)" />
                    </div>

                    <div>
                      <p className="text-caption font-medium uppercase tracking-wide text-(--color-text-muted)">
                        Purpose
                      </p>

                      <button
                        type="button"
                        className="mt-1 flex items-center gap-1 text-body-sm font-medium text-(--color-text)"
                      >
                        Buy
                        <ChevronDown size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Property type */}
                  <div className="flex min-h-20 flex-1 items-center gap-3 border-b border-(--color-border) px-5 py-4 lg:border-b-0 lg:border-r">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--color-neutral-100)">
                      <SlidersHorizontal
                        size={17}
                        className="text-(--color-text-secondary)"
                      />
                    </div>

                    <div>
                      <p className="text-caption font-medium uppercase tracking-wide text-(--color-text-muted)">
                        Property
                      </p>

                      <button
                        type="button"
                        className="mt-1 flex items-center gap-1 text-body-sm font-medium text-(--color-text)"
                      >
                        Any type
                        <ChevronDown size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="flex items-center p-2">
                    <Button
                      size="lg"
                      className="h-16 w-full px-7 lg:w-auto"
                    >
                      <Search size={19} />
                      Search
                    </Button>
                  </div>
                </div>
              </div>

              {/* Featured property context */}
              <div className="mt-4 flex items-center justify-between gap-4 text-white/70">
                <Link
                  to={`/properties/${property.id}`}
                  className="text-body-sm transition-colors hover:text-white"
                >
                  Featured · {property.title}
                </Link>

                <Link
                  to="/properties"
                  className="text-body-sm transition-colors hover:text-white"
                >
                  Explore all properties →
                </Link>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;

