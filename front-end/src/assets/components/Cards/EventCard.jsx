import React from 'react';

const EventCard = ({ title, description, image, reverse }) => {
  return (
    <section className={`flex flex-wrap justify-center items-center my-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      {/* Text Section */}
      <div className="w-full md:w-1/2 px-4 mb-6 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-gray-600 leading-relaxed text-center">
          {description}
        </p>
      </div>
      
      {/* Image Section */}
      <div className="w-full md:w-1/2 px-4">
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-lg w-full object-cover"
        />
      </div>
    </section>
  );
};

export default EventCard;
