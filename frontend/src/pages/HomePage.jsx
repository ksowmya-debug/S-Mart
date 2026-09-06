import React from 'react';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import WhyNotes from '../components/WhyNotes';
import HowItWorks from '../components/HowItWorks';
import NotesPreviewSection from '../components/NotesPreviewSection';
import PricingCard from '../components/PricingCard';
import Testimonials from '../components/Testimonials';
import FaqSection from '../components/FaqSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <StatsSection />
      <WhyNotes />
      <HowItWorks />
      <NotesPreviewSection />
      <PricingCard />
      <Testimonials />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
