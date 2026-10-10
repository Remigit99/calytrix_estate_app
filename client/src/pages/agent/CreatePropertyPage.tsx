
import { FormEvent, useState } from 'react';
import {
  ArrowLeft,
  Building2,
  ImagePlus,
  Loader2,
  MapPin,
  Plus,
  Trash2,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { useCreatePropertyMutation } from '../../features/properties/propertiesApi';
import type {
  Availability,
  CreatePropertyImagePayload,
  PropertyType,
  Purpose,
} from '../../features/properties/propertyTypes';

type ImageDraft = CreatePropertyImagePayload;

const PROPERTY_TYPES: PropertyType[] = [
  'APARTMENT',
  'HOUSE',
  'DUPLEX',
  'TOWNHOUSE',
  'VILLA',
  'LAND',
  'COMMERCIAL',
];

const PURPOSES: Purpose[] = ['SALE', 'RENT'];

const AVAILABILITIES: Availability[] = [
  'AVAILABLE',
  'SOLD',
  'RENTED',
];

const CreatePropertyPage = () => {
  const navigate = useNavigate();

  const [createProperty, { isLoading }] =
    useCreatePropertyMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [purpose, setPurpose] = useState<Purpose>('SALE');
  const [propertyType, setPropertyType] =
    useState<PropertyType>('HOUSE');
  const [availability, setAvailability] =
    useState<Availability>('AVAILABLE');

  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [parkingSpaces, setParkingSpaces] = useState('');

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('Nigeria');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [images, setImages] = useState<ImageDraft[]>([]);

  const [error, setError] = useState('');

  const addImage = () => {
    setImages((current) => [
      ...current,
      {
        url: '',
        altText: '',
        position: current.length,
        isPrimary: current.length === 0,
      },
    ]);
  };

  const removeImage = (index: number) => {
    setImages((current) =>
      current
        .filter((_, imageIndex) => imageIndex !== index)
        .map((image, imageIndex) => ({
          ...image,
          position: imageIndex,
          isPrimary: imageIndex === 0,
        })),
    );
  };

  const updateImage = (
    index: number,
    field: keyof ImageDraft,
    value: string | boolean,
  ) => {
    setImages((current) =>
      current.map((image, imageIndex) =>
        imageIndex === index
          ? {
              ...image,
              [field]: value,
            }
          : image,
      ),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const validImages = images
      .filter((image) => image.url.trim())
      .map((image, index) => ({
        url: image.url.trim(),
        ...(image.altText?.trim()
          ? { altText: image.altText.trim() }
          : {}),
        position: index,
        isPrimary: index === 0,
      }));

    try {
      const property = await createProperty({
        title: title.trim(),
        description: description.trim(),
        price: price.trim(),
        purpose,
        propertyType,
        availability,
        ...(bedrooms
          ? { bedrooms: Number(bedrooms) }
          : {}),
        ...(bathrooms
          ? { bathrooms: Number(bathrooms) }
          : {}),
        ...(parkingSpaces
          ? { parkingSpaces: Number(parkingSpaces) }
          : {}),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        country: country.trim(),
        ...(latitude.trim()
          ? { latitude: latitude.trim() }
          : {}),
        ...(longitude.trim()
          ? { longitude: longitude.trim() }
          : {}),
        ...(validImages.length > 0
          ? { images: validImages }
          : {}),
      }).unwrap();

    if (!property?.id) {
      throw new Error('The API did not return a property ID.');
    }
      navigate(`/properties/${property.id}`);
    } catch (requestError: any) {
      const message =
        requestError?.data?.message ||
        requestError?.data?.error ||
        'Unable to create this property. Please check your information and try again.';

      setError(
        Array.isArray(message)
          ? message.join(', ')
          : message,
      );
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10';

  const labelClass =
    'mb-2 block text-sm font-medium text-slate-700';

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <Link
              to="/agent"
              className="mb-2 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Agent dashboard
            </Link>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              List a property
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create a property listing for your portfolio.
            </p>
          </div>

          <div className="hidden rounded-2xl bg-indigo-50 p-3 text-indigo-600 sm:block">
            <Building2 className="h-6 w-6" />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Basic information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-950">
                Basic information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Give potential buyers or renters a clear overview.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="title" className={labelClass}>
                  Property title
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  className={inputClass}
                  placeholder="e.g. Modern 4 Bedroom Duplex"
                  minLength={5}
                  maxLength={150}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className={labelClass}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  className={`${inputClass} min-h-36 resize-y`}
                  placeholder="Describe the property, its features, surroundings and what makes it attractive..."
                  minLength={20}
                  maxLength={5000}
                  required
                />

                <p className="mt-2 text-xs text-slate-400">
                  {description.length}/5000 characters
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="purpose" className={labelClass}>
                    Purpose
                  </label>

                  <select
                    id="purpose"
                    value={purpose}
                    onChange={(event) =>
                      setPurpose(
                        event.target.value as Purpose,
                      )
                    }
                    className={inputClass}
                  >
                    {PURPOSES.map((item) => (
                      <option key={item} value={item}>
                        {item === 'SALE' ? 'For Sale' : 'For Rent'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="propertyType"
                    className={labelClass}
                  >
                    Property type
                  </label>

                  <select
                    id="propertyType"
                    value={propertyType}
                    onChange={(event) =>
                      setPropertyType(
                        event.target.value as PropertyType,
                      )
                    }
                    className={inputClass}
                  >
                    {PROPERTY_TYPES.map((item) => (
                      <option key={item} value={item}>
                        {item
                          .toLowerCase()
                          .replace(/_/g, ' ')
                          .replace(/\b\w/g, (char) =>
                            char.toUpperCase(),
                          )}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="availability"
                    className={labelClass}
                  >
                    Availability
                  </label>

                  <select
                    id="availability"
                    value={availability}
                    onChange={(event) =>
                      setAvailability(
                        event.target.value as Availability,
                      )
                    }
                    className={inputClass}
                  >
                    {AVAILABILITIES.map((item) => (
                      <option key={item} value={item}>
                        {item
                          .toLowerCase()
                          .replace(/\b\w/g, (char) =>
                            char.toUpperCase(),
                          )}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="price" className={labelClass}>
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                    ₦
                  </span>

                  <input
                    id="price"
                    type="text"
                    inputMode="decimal"
                    value={price}
                    onChange={(event) =>
                      setPrice(event.target.value)
                    }
                    className={`${inputClass} pl-9`}
                    placeholder="85,000,000"
                    required
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Enter the numeric price without the currency symbol.
                </p>
              </div>
            </div>
          </section>

          {/* Property details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-950">
                Property details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add the key specifications of the property.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="bedrooms" className={labelClass}>
                  Bedrooms
                </label>

                <input
                  id="bedrooms"
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={(event) =>
                    setBedrooms(event.target.value)
                  }
                  className={inputClass}
                  placeholder="4"
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className={labelClass}>
                  Bathrooms
                </label>

                <input
                  id="bathrooms"
                  type="number"
                  min="0"
                  value={bathrooms}
                  onChange={(event) =>
                    setBathrooms(event.target.value)
                  }
                  className={inputClass}
                  placeholder="5"
                />
              </div>

              <div>
                <label
                  htmlFor="parkingSpaces"
                  className={labelClass}
                >
                  Parking spaces
                </label>

                <input
                  id="parkingSpaces"
                  type="number"
                  min="0"
                  value={parkingSpaces}
                  onChange={(event) =>
                    setParkingSpaces(event.target.value)
                  }
                  className={inputClass}
                  placeholder="2"
                />
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Location
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Where is this property located?
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="address" className={labelClass}>
                  Address
                </label>

                <input
                  id="address"
                  value={address}
                  onChange={(event) =>
                    setAddress(event.target.value)
                  }
                  className={inputClass}
                  placeholder="123 Example Street"
                  maxLength={255}
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>

                  <input
                    id="city"
                    value={city}
                    onChange={(event) =>
                      setCity(event.target.value)
                    }
                    className={inputClass}
                    placeholder="Abuja"
                    maxLength={100}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>

                  <input
                    id="state"
                    value={state}
                    onChange={(event) =>
                      setState(event.target.value)
                    }
                    className={inputClass}
                    placeholder="FCT"
                    maxLength={100}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="country" className={labelClass}>
                    Country
                  </label>

                  <input
                    id="country"
                    value={country}
                    onChange={(event) =>
                      setCountry(event.target.value)
                    }
                    className={inputClass}
                    placeholder="Nigeria"
                    maxLength={100}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="latitude"
                    className={labelClass}
                  >
                    Latitude
                    <span className="ml-2 font-normal text-slate-400">
                      optional
                    </span>
                  </label>

                  <input
                    id="latitude"
                    value={latitude}
                    onChange={(event) =>
                      setLatitude(event.target.value)
                    }
                    className={inputClass}
                    placeholder="9.0765"
                  />
                </div>

                <div>
                  <label
                    htmlFor="longitude"
                    className={labelClass}
                  >
                    Longitude
                    <span className="ml-2 font-normal text-slate-400">
                      optional
                    </span>
                  </label>

                  <input
                    id="longitude"
                    value={longitude}
                    onChange={(event) =>
                      setLongitude(event.target.value)
                    }
                    className={inputClass}
                    placeholder="7.3986"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                  <ImagePlus className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-950">
                    Property images
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add image URLs for your property.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={addImage}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
                Add image
              </button>
            </div>

            {images.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                <ImagePlus className="mx-auto h-8 w-8 text-slate-400" />

                <p className="mt-3 text-sm font-medium text-slate-700">
                  No images added yet
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Add at least one image to make your listing more attractive.
                </p>

                <button
                  type="button"
                  onClick={addImage}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" />
                  Add first image
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {images.map((image, index) => (
                  <div
                    key={`${index}-${image.url}`}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Image {index + 1}
                          {index === 0 && (
                            <span className="ml-2 rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600">
                              Primary
                            </span>
                          )}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr]">
                      <div>
                        <label
                          htmlFor={`image-url-${index}`}
                          className={labelClass}
                        >
                          Image URL
                        </label>

                        <input
                          id={index}
                          type="url"
                          value={image.url}
                          onChange={(event) =>
                            updateImage(
                              index,
                              'url',
                              event.target.value,
                            )
                          }
                          className={inputClass}
                          placeholder="https://example.com/property.jpg"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`image-alt-${index}`}
                          className={labelClass}
                        >
                          Alt text
                        </label>

                        <input
                          id={`image-alt-${index}`}
                          value={image.altText ?? ''}
                          onChange={(event) =>
                            updateImage(
                              index,
                              'altText',
                              event.target.value,
                            )
                          }
                          className={inputClass}
                          placeholder="Front exterior of property"
                          maxLength={255}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/agent"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {isLoading
                ? 'Creating listing...'
                : 'Create listing'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreatePropertyPage;

