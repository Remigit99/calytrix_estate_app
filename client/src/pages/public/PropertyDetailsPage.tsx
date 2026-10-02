import {
  ArrowLeft,
  Bath,
  BedDouble,
  Heart,
  MapPin,
  ParkingSquare,
  Phone,
  Share2,
} from 'lucide-react';
import { Link, useParams } from 'react-router';

import { useGetPropertyByIdQuery } from '../../features/properties/propertiesApi';
import EstateLoader from '../../components/ui/EstateLoader';

const formatPrice = (
  price: string,
  purpose: 'SALE' | 'RENT',
) => {
  const amount = Number(price);

  if (Number.isNaN(amount)) {
    return price;
  }

  const formatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);

  return purpose === 'RENT'
    ? `${formatted} / year`
    : formatted;
};

const formatPropertyType = (type: string) =>
  type.charAt(0) + type.slice(1).toLowerCase();

const PropertyDetailsPage = () => {
  const { id } = useParams();

  const {
    data: property,
    isLoading,
    isError,
  } = useGetPropertyByIdQuery(id!, {
    skip: !id,
  });

  if (isLoading) {
    return <EstateLoader />;
  }

  if (isError || !property) {
    return (
      <main className="min-h-[70vh] bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Property not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            We couldn't find the property you're looking for.
          </p>

          <Link
            to="/properties"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to properties
          </Link>
        </div>
      </main>
    );
  }

  const primaryImage =
    property.images.find((image) => image.isPrimary) ??
    property.images[0];

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to properties
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-6 pt-6 lg:px-8">
        {property.images.length === 0 ? (
          <div className="flex h-90 items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-400">
            No property images available
          </div>
        ) : (
          <div
            className={[
              'grid gap-3 overflow-hidden rounded-2xl',
              property.images.length === 1
                ? 'grid-cols-1'
                : 'lg:grid-cols-[1.6fr_1fr]',
            ].join(' ')}
          >
            {/* Primary image */}
            <div className="relative h-90 overflow-hidden bg-slate-100 sm:h-115 lg:h-140">
              <img
                src={property.images[0].url}
                alt={
                  property.images[0].altText ??
                  property.title
                }
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />

              <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/50 to-transparent" />

              <div className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-sm backdrop-blur">
                {property.purpose === 'SALE'
                  ? 'For Sale'
                  : 'For Rent'}
              </div>

              <div className="absolute bottom-5 left-5 text-sm font-medium text-white">
                {property.images.length}{' '}
                {property.images.length === 1
                  ? 'photo'
                  : 'photos'}
              </div>
            </div>

            {/* Supporting images */}
            {property.images.length > 1 && (
              <div className="hidden min-h-0 gap-3 lg:grid">
                {property.images
                  .slice(1, 4)
                  .map((image, index) => {
                    const remaining =
                      property.images.length - 4;

                    const isLastVisible =
                      index === 2 &&
                      remaining > 0;

                    return (
                      <div
                        key={image.id}
                        className="relative min-h-0 overflow-hidden bg-slate-100"
                      >
                        <img
                          src={image.url}
                          alt={
                            image.altText ??
                            `${property.title} photo ${index + 2
                            }`
                          }
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                        />

                        {isLastVisible && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                            <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg">
                              +{remaining} more
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* Mobile thumbnails */}
        {property.images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {property.images.map((image, index) => (
              <div
                key={image.id}
                className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100"
              >
                <img
                  src={image.url}
                  alt={
                    image.altText ??
                    `${property.title} photo ${index + 1}`
                  }
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Property information */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span>{formatPropertyType(property.propertyType)}</span>
              <span>•</span>
              <span>{property.availability}</span>
            </div>

            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {property.title}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-slate-500">
              <MapPin className="h-5 w-5 shrink-0 text-indigo-600" />
              <span>
                {property.address}, {property.city},{' '}
                {property.state}
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
              {formatPrice(
                property.price,
                property.purpose,
              )}
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 p-4">
                <BedDouble className="h-5 w-5 text-indigo-600" />
                <p className="mt-3 text-lg font-bold text-slate-950">
                  {property.bedrooms}
                </p>
                <p className="text-xs text-slate-500">
                  Bedrooms
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <Bath className="h-5 w-5 text-indigo-600" />
                <p className="mt-3 text-lg font-bold text-slate-950">
                  {property.bathrooms}
                </p>
                <p className="text-xs text-slate-500">
                  Bathrooms
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <ParkingSquare className="h-5 w-5 text-indigo-600" />
                <p className="mt-3 text-lg font-bold text-slate-950">
                  {property.parkingSpaces ?? '—'}
                </p>
                <p className="text-xs text-slate-500">
                  Parking
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <MapPin className="h-5 w-5 text-indigo-600" />
                <p className="mt-3 text-lg font-bold text-slate-950">
                  {property.city}
                </p>
                <p className="text-xs text-slate-500">
                  Location
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-950">
                About this property
              </h2>

              <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-8 text-slate-600">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-bold text-slate-950">
                  Amenities
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600"
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Listed by
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-950">
                  {property.agent.firstName}{' '}
                  {property.agent.lastName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Calytrix Estate Agent
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Phone className="h-4 w-4" />
                  Contact agent
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  <Heart className="h-4 w-4" />
                  Save property
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  <Share2 className="h-4 w-4" />
                  Share property
                </button>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-xs leading-5 text-slate-400">
                  Interested in this property? Contact the
                  agent to ask questions or arrange a viewing.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default PropertyDetailsPage;