export type PropertyPurpose = 'SALE' | 'RENT';

export type PropertyType =
  | 'APARTMENT'
  | 'HOUSE'
  | 'DUPLEX'
  | 'VILLA'
  | 'LAND'
  | 'OFFICE'
  | 'SHOP'
  | 'WAREHOUSE'
  | 'OTHER';

export type ListingStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type PropertyAvailability =
  | 'AVAILABLE'
  | 'SOLD'
  | 'RENTED';

export type PropertyImage = {
  id: string;
  propertyId: string;
  url: string;
  altText: string | null;
  position: number;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PropertyAgent = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  price: string;
  purpose: PropertyPurpose;
  propertyType: PropertyType;
  listingStatus: ListingStatus;
  availability: PropertyAvailability;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number | null;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  agentId: string;
  createdAt: string;
  updatedAt: string;
  images: PropertyImage[];
  amenities: string[];
  agent: PropertyAgent;
};

export type PropertyListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PropertyListResponse = {
  data: Property[];
  meta: PropertyListMeta;
};