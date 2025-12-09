import React from 'react';
import Banner from '../Components/Banner';
import FeaturedSection from '../Components/FeaturedSection';
import ContactUs from '../Components/ContactUs';
import CTASection from '../Components/CTASection';
import FAQSection from '../Components/FAQSection';
import SuccessStories from '../Components/SuccessStories';
import GallerySection from '../Components/GallerySection';

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedSection />
      <GallerySection />
      <CTASection />
      <SuccessStories />
      <ContactUs />
      <FAQSection />
    </div>
  );
};

export default Home;
