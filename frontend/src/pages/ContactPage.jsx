import React from 'react';
import ContactSection from '../components/ContactSection';
import FaqSection from '../components/FaqSection';

const ContactPage = () => {
  return (
    <div className="pt-24 min-h-screen">
      <ContactSection />
      <FaqSection />
    </div>
  );
};

export default ContactPage;
