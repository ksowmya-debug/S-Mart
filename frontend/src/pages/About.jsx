import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const About = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Your One-Stop Fashion Destination
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            At S-Mart, we believe that fashion is more than just clothing; it's a form of self-expression. Our mission is to provide you with the latest trends and timeless classics, all in one place.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2">
              <img className="h-auto w-full rounded-lg shadow-lg" src={assets.about_img} alt="About S-Mart" />
            </div>
            <div className="lg:w-1/2 lg:pl-10 mt-10 lg:mt-0">
              <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
              <p className="mt-4 text-lg text-gray-600">
                S-Mart started as a small boutique with a big dream: to make high-quality fashion accessible to everyone. We handpick each item in our collection, ensuring that it meets our high standards of style and quality. From casual wear to formal attire, we have something for every occasion.
              </p>
              <h3 className="mt-8 text-2xl font-bold text-gray-900">Our Commitment</h3>
              <p className="mt-4 text-lg text-gray-600">
                We are committed to providing our customers with an exceptional shopping experience. This means offering a wide selection of products, competitive prices, and outstanding customer service. We are always here to help you find the perfect outfit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
