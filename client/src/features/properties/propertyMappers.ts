import type { Property } from '../../types/api';
import type { PropertyCardData } from './components/PropertyCard';

export const mapPropertyToCard = (
  property: Property,
): PropertyCardData => {
  const primaryImage =
    property.images.find((image) => image.isPrimary) ??
    property.images[0];

  return {
    id: property.id,
    title: property.title,
    location: `${property.city}, ${property.state}`,
    price:
      property.purpose === 'RENT'
        ? `₦${property.price.toLocaleString()}/year`
        : `₦${property.price.toLocaleString()}`,
    purpose: property.purpose,
    propertyType: property.propertyType,
    bedrooms: property.bedrooms ?? 0,
    bathrooms: property.bathrooms ?? 0,
    imageUrl:
      primaryImage?.url ??
      '/placeholder-property.jpg',
    imageAlt:
      primaryImage?.altText ??
      property.title,
  };
};