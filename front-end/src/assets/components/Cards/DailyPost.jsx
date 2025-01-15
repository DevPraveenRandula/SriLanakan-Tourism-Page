import React from 'react';
import { useNavigate } from 'react-router-dom';

const DailyPost = ({ id, title, date, author, description, image }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image Section with Badges */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span className="bg-green-700 text-white px-3 py-1 rounded-md text-xs font-medium">
            📅 {date}
          </span>
        </div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black text-white px-4 py-2 rounded-md shadow-md">
          <span className="flex items-center text-sm">
            📅 {date}
          </span>
          <span className="flex items-center text-sm">
            👤 {author}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <a
          onClick={handleReadMore}
          className="inline-block border border-black text-black px-4 py-2 rounded-md font-medium hover:bg-black hover:text-white transition cursor-pointer"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default DailyPost;
