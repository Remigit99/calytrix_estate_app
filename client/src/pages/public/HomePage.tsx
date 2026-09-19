import Hero from '../../components/marketing/Hero';
import { featuredProperty } from '../../features/properties/featuredProperty';

const HomePage = () => {
  return <Hero property={featuredProperty} />;
};

export default HomePage;