import {
  Bath,
  BedDouble,
  Heart,
  MapPin,
  ParkingSquare,
  ArrowUpRight,
} from 'lucide-react';

import type { Property } from './propertyTypes';
import { Link } from 'react-router';

type PropertyCardProps = {
  property: Property;
};

const formatPrice = (price: string, purpose: Property['purpose']) => {
  const amount = Number(price);

  if (Number.isNaN(amount)) {
    return price;
  }

  const formatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);

  return purpose === 'RENT' ? `${formatted} / year` : formatted;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  const primaryImage =
    property.images.find((image) => image.isPrimary) ??
    property.images[0];

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50">

      <Link
        to={`/properties/${property.id}`}
        className='block'
      >
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={primaryImage.altText ?? property.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No image available
            </div>
          )}

          {/* Gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/40 to-transparent" />

          {/* Purpose badge */}
          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-900 shadow-sm backdrop-blur">
            For {property.purpose === 'SALE' ? 'Sale' : 'Rent'}
          </div>

          {/* Favorite */}
          <button
            type="button"
            aria-label={`Add ${property.title} to favorites`}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white hover:text-indigo-600"
          >
            <Heart className="h-4.5 w-4.5" />
          </button>

          {/* Property type */}
          <div className="absolute bottom-4 left-4 rounded-md bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {property.propertyType}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-3">
            <p className="mb-1 text-xl font-bold tracking-tight text-slate-950">
              {formatPrice(property.price, property.purpose)}
            </p>

            <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
              {property.title}
            </h3>

            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {property.city}, {property.state}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
            <div className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4" />
              <span>{property.bedrooms} beds</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} baths</span>
            </div>

            {property.parkingSpaces !== null && (
              <div className="flex items-center gap-1.5">
                <ParkingSquare className="h-4 w-4" />
                <span>{property.parkingSpaces} parking</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {property.availability}
            </span>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              View property
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

      </Link>
    </article>
  );
};

export default PropertyCard;