import PropertyCard from './PropertyCard';
import type { Property } from './propertyTypes';

type PropertyGridProps = {
  properties: Property[];
};

const PropertyGrid = ({ properties }: PropertyGridProps) => {
  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          No properties found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Try adjusting your search or filters to find properties that match
          what you are looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;