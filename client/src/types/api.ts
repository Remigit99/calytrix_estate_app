export type PropertyPurpose = 'SALE' | 'RENT';

export type PropertyType =
  | 'APARTMENT'
  | 'HOUSE'
  | 'DUPLEX'
  | 'LAND'
  | 'COMMERCIAL';

export type ListingStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type Availability =
  | 'AVAILABLE'
  | 'SOLD'
  | 'RENTED';

export type PropertyImage = {
  id: string;
  url: string;
  altText?: string | null;
  isPrimary: boolean;
  position: number;
};

export type PropertyAgent = {
  id: string;
  firstName: string;
  lastName: string;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  purpose: PropertyPurpose;
  propertyType: PropertyType;
  price: number;
  listingStatus: ListingStatus;
  availability: Availability;
  bedrooms: number | null;
  bathrooms: number | null;
  parkingSpaces: number | null;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  images: PropertyImage[];
  agent: PropertyAgent;
  createdAt: string;
  updatedAt: string;
};

export type PropertyQuery = {
  city?: string;
  state?: string;
  purpose?: PropertyPurpose;
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  sortBy?: 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

export type PaginatedProperties = {
  data: Property[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};