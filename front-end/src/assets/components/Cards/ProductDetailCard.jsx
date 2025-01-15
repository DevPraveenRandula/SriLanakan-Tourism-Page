import React from 'react';
import { Link } from 'react-router-dom';

const ProductDetailCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-black mb-2">{product.name}</h3>
        <p className="text-gray-800">{product.description}</p>
        <Link
          to={`/product/${product.id}`}
          className="text-blue-500 hover:underline"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailCard;
