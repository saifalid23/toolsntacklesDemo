import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedProducts from '@/components/FeaturedProducts';
import ContactCTA from '@/components/ContactCTA';
import LocationMap from '@/components/LocationMap';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <ContactCTA />
      <LocationMap />
    </>
  );
}
