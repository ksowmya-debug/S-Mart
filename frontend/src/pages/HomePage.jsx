import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../assets/frontend_assets/assets';
import { toast } from 'react-toastify';

const HomePage = () => {
  const { products, addToCart } = useContext(StoreContext);
  const bestsellers = products.filter(product => product.bestseller);

  const handleAddToCart = (itemId) => {
    console.log("Add to cart button clicked for item:", itemId); // Debugging line
    addToCart(itemId);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Find Your</span>{' '}
                  <span className="block text-indigo-600 xl:inline">Perfect Style</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/Collections" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src={assets.hero_img} alt="" />
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="bg-gray-100">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Our Best Sellers</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {bestsellers.map((product) => (
              <div key={product._id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={`http://localhost:8000/images/${product.image[0]}`}
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/product/${product._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="mt-4 w-full bg-indigo-600 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop by Category Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Shop by Category</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Explore Our Collections
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
                <div className="group relative">
                    <div className="w-full h-80 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-96">
                        <img src={`http://localhost:8000/images/${products.find(p=>p.category==='Men')?.image[0]}`} alt="Men's Collection" className="w-full h-full object-center object-cover" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-900">
                        <Link to="/Collections">
                            <span className="absolute inset-0" />
                            Men's Collection
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Shop Now</p>
                </div>

                <div className="group relative">
                    <div className="w-full h-80 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-96">
                        <img src={`http://localhost:8000/images/${products.find(p=>p.category==='Women')?.image[0]}`} alt="Women's Collection" className="w-full h-full object-center object-cover" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-900">
                        <Link to="/Collections">
                            <span className="absolute inset-0" />
                            Women's Collection
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Shop Now</p>
                </div>
            </div>
        </div>
    </div>

      {/* Why Choose Us Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Why Choose Us?</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    A Better Shopping Experience
                </p>
            </div>

            <div className="mt-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                    <div className="relative">
                        <dt>
                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                <img src={assets.quality_icon} alt="" className="h-6 w-6" />
                            </div>
                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Quality Products</p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                            We offer a curated selection of high-quality products that you can trust.
                        </dd>
                    </div>

                    <div className="relative">
                        <dt>
                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                <img src={assets.exchange_icon} alt="" className="h-6 w-6" />
                            </div>
                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy Returns</p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                            Not satisfied with your purchase? We offer a hassle-free return policy.
                        </dd>
                    </div>

                    <div className="relative">
                        <dt>
                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                <img src={assets.support_img} alt="" className="h-6 w-6" />
                            </div>
                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">24/7 Support</p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                            Our customer support team is here to help you with any questions or concerns.
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
    </div>
  );
};

export default HomePage;
