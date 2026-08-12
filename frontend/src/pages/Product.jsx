import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';


const Product = () => {
  const { productId } = useParams();
  const { addToCart, cartItems } = useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching product:", err);
        // Optionally, redirect to a 404 page or display an error message
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="text-center mt-10">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error.message || "Product not found."}</div>;
  }

  if (!product) { // Fallback if product is null after loading/error
    return <div className="text-center mt-10">Product not found.</div>;
  }

  const handleAddToCart = () => {
    console.log("Adding to cart:", product._id, "Quantity:", quantity);
    const numQuantity = parseInt(quantity);
    if (numQuantity > 0) {
        addToCart(product._id, numQuantity);
    } else {
        console.log("Invalid quantity:", quantity);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={`http://localhost:8000/images/${product.image[0]}`} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{product.category}</p>
          <p className="text-2xl font-semibold text-indigo-600 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4 text-lg font-medium">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-20 p-2 border border-gray-300 rounded-md text-center"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
