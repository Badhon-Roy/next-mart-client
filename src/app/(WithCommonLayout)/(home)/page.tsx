import Category from '@/components/modules/home/Category';
import FeaturedProducts from '@/components/modules/home/FeaturedProduct';
import FlashSale from '@/components/modules/home/FlashSale';
import HeroSection from '@/components/modules/home/HeroSection';
import TopBrands from '@/components/modules/home/TopBrands';

const HomePage =  () => {
  return (
    <div>
      <HeroSection/>
      <Category/>
      <FeaturedProducts/>
      <FlashSale/>
      <TopBrands/>
    </div>
  );
};

export default HomePage;