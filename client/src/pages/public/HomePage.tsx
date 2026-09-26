// import FeaturedProperties from '../../components/marketing/FeaturedProperties';
import Hero from '../../components/marketing/Hero';
import { useGetPropertiesQuery } from '../../features/properties/propertiesApi';
import { mapPropertyToCard } from '../../features/properties/propertyMappers';
import { featuredProperty } from '../../features/properties/featuredProperty';

const HomePage = () => {
  const { data, isLoading, isError } = useGetPropertiesQuery({
    page: 1,
    limit: 3,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const properties =
    data?.data.map(mapPropertyToCard) ?? [];

  return (
    <>
      <Hero property={featuredProperty} />

      {/* <FeaturedProperties
        properties={properties}
        isLoading={isLoading}
        isError={isError}
      /> */}
    </>
  );
};

export default HomePage;









// import Hero from '../../components/marketing/Hero';
// import { featuredProperty } from '../../features/properties/featuredProperty';

// const HomePage = () => {
//   return <Hero property={featuredProperty} />;
// };

// export default HomePage;