import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ id,image, title, description, price, location, category, cardStyle = "" }) => {
  return (
    <Link
      to={`/blogs/${id}`}
      onClick={() => window.scrollTo(0, 0)}
      state={{ image, title, description, price, location, category }}
      className="block"
    >
      <div
        className={`p-4 border rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 bg-white ${cardStyle}`}
      >
        {/* Image Section */}
        <div className="overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="h-[220px] w-full object-cover rounded-t-lg transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col justify-between h-[200px]">
          <h1 className="text-xl font-semibold mb-2 truncate">{title}</h1>
          <p className="text-sm text-gray-600 mb-2 truncate">{location}</p>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm text-blue-600 font-medium">{category}</span>
            <span className="text-lg font-bold text-gray-900">${price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
