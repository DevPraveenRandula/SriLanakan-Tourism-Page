import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/product/${product.id}`); 
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 text-center">
      {/* New Badge */}
      {product.isNew && (
        <div className="bg-black text-white text-xs px-3 py-1 rounded-full uppercase absolute top-2 right-2">
          New
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div>
        {/* Product Name */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h2>

        {/* Rating */}
        <div className="flex justify-center mb-3">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={`text-lg ${
                index < product.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <button
          onClick={handleButtonClick}
          className={`py-2 px-6 rounded-md uppercase font-semibold transition-colors duration-300 ${
            isClicked
              ? "bg-gray-700 text-white hover:bg-gray-800"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
