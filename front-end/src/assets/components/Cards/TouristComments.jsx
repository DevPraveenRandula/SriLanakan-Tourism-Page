import React, { useEffect, useRef } from 'react';

const TouristComments = () => {
  const commentContainerRef = useRef(null);
  const currentIndexRef = useRef(0);

  const comments = [
    {
      id: 1,
      text: "Fantastic! Really great country with hospitable people...",
      name: "David Thomson",
      location: "United Kingdom",
      image: "/Images/TouristComments/img-1.jpg"
    },
    {
      id: 2,
      text: "I have been to Sri Lanka for 2 times now...",
      name: "Simona Alixa",
      location: "New Zealand",
      image: "/Images/TouristComments/img-2.jpg"
    },
    {
      id: 3,
      text: "If you want to explore the must-see sights...",
      name: "Petra Marick",
      location: "London",
      image: "/Images/TouristComments/img-3.png"
    },
    {
      id: 4,
      text: "Amazing culture and beautiful landscapes...",
      name: "John Doe",
      location: "USA",
      image: "/Images/TouristComments/img-4.png"
    },
    {
      id: 5,
      text: "Best travel experience of my life!",
      name: "Emily Clark",
      location: "Australia",
      image: "/Images/TouristComments/img-5.jpg"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (commentContainerRef.current) {
        const totalComments = comments.length;
        currentIndexRef.current = (currentIndexRef.current + 1) % totalComments;

        const scrollPosition = currentIndexRef.current * (commentContainerRef.current.offsetWidth / 3);

        commentContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
  }, [comments.length]);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Tourist's Reviews</h2>
        <div
          ref={commentContainerRef}
          className="flex overflow-hidden scrollbar-hide border rounded-md shadow-lg"
          style={{
            scrollSnapType: 'x mandatory',
            width: '100%',
            whiteSpace: 'nowrap',
          }}
        >
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="w-1/3 flex-shrink-0 px-2"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="bg-gray-50 shadow-md rounded-md p-6 flex flex-col items-center text-center">
                <img
                  src={comment.image}
                  alt={comment.name}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-gray-200 shadow-md"
                />
                <p className="text-gray-600 italic mb-4">"{comment.text}"</p>
                <h4 className="text-lg font-semibold">{comment.name}</h4>
                <p className="text-sm text-primary">{comment.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TouristComments;
