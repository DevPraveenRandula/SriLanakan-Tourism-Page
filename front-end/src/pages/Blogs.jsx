import React, { useEffect, useState } from "react";
import Navbar from '../assets/components/Navbar';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosInastance';
import BlogCard from "../assets/components/Cards/BlogCard";

import BannerImage from "../assets/Images/banner3.jpg";
import Img1 from "../assets/Images/Blogs/img-1.jpg";
import Img2 from "../assets/Images/Blogs/img-2.jpg";
import Img3 from "../assets/Images/Blogs/img-4.jpg";
import Img4 from "../assets/Images/Blogs/img-3.jpg";
import Img5 from "../assets/Images/Blogs/img-6.webp";
import Img6 from "../assets/Images/Blogs/img-5.jpg";





const blogs = [
  {
    id: 1,
    image: Img2,
    title: "Sri Lanka's South Coast Beaches",
    description:
      "Discover the beauty of Sri Lanka's South Coast, home to stunning beaches and world-class surfing destinations.",
    price: 150,
    location: "Sri Lanka",
    category: "Beach Holiday",
  },
  {
    id: 2,
    image: Img3,
    title: "Top 5 Places to Stay in Sri Lanka in Winter ❄️🏡",
    description: "Find out the top 5 must-visit accommodations in Sri Lanka for a cozy and unforgettable winter experience.",
    price: 200,
    location: "Sri Lanka",
    category: "Cultural Tour",
  },
  {
    id: 3,
    image: Img1,
    title: "7 Must-Visit Temples in Sri Lanka",
    description: "Explore 7 breathtaking temples in Sri Lanka that highlight the country's rich cultural and spiritual heritage.",
    price: 180,
    location: "Sri Lanka",
    category: "Hill Country Tour",
  },
  {
    id: 4,
    image: Img4,
    title: "Explore the Ancient Cities of Sri Lanka 🏛️",
    topic: "Sri Lanka's Timeless Heritage and Historic Cities",
    description:
      "Journey through the ancient capitals of Sri Lanka, exploring architectural wonders, sacred sites, and cultural landmarks that tell the story of a rich and vibrant history.",
    price: 75,
    location: "Sri Lanka",
    category: "Cultural Tourism",
  },
  {
    id: 5,
    image: Img5,
    title: "The Ultimate Guide to Colombo 🏙️🍴",
    topic: "Discover Colombo: A Blend of Modernity and Heritage",
    description:
      "Explore the vibrant streets of Colombo, offering a mix of historical landmarks, modern attractions, and culinary delights that showcase Sri Lanka’s rich culture and history.",
    price: 220,
    location: "Colombo, Sri Lanka",
    category: "City Exploration",
  },
  {
    id: 6,
    image: Img6,
    title: "Sri Lanka’s Majestic Waterfalls 🌊🌿",
    topic: "Chasing Waterfalls: Sri Lanka's Natural Wonders",
    description:
      "Discover the breathtaking waterfalls nestled in Sri Lanka's lush landscapes. Perfect for nature lovers and adventurers alike, these cascading gems offer unforgettable scenic beauty.",
    price: 220,
    location: "Sri Lanka",
    category: "Nature & Adventure",
  },
];


const Blogs = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
  
    // Fetch user info
    const getUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/get-user");
        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };
    // Scroll to the top when the component is loaded
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });  // Scroll smoothly to top
    }, []);
  

    useEffect(() => {
      getUserInfo();
    }, []);
  
  return (
    <>
     <Navbar userInfo={userInfo} />
      {/* Banner Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={BannerImage}
          alt="Discover the World"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Discover the World
          </h1>
        </div>
      </section>

      {/* Text Section */}
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Discover Our Blogs</h2>
      <p className="text-lg mb-4">
        Dive into the heart of Sri Lanka through our carefully curated blogs. Each post is designed to guide you through the most captivating experiences the island has to offer, from its breathtaking natural landscapes to its rich cultural heritage.
      </p>
      <p className="text-lg mb-4">
        Whether you're seeking the serenity of the south coast beaches, the charm of ancient cities, or the thrill of exploring majestic waterfalls, our blogs provide you with the perfect roadmap for your adventures. Discover hidden gems, learn about local culture, and plan your dream trip to Sri Lanka with our insights.
      </p>
      <p className="text-lg">
        Stay inspired as you read about the best places to stay, the top culinary delights to savor, and the most exciting activities for every traveler. Let our blogs be your gateway to the wonders of Sri Lanka!
      </p>
    </section>


      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id} 
              image={blog.image}
              title={blog.title}
              description={blog.description}
              price={blog.price}
              location={blog.location}
              category={blog.category}
            />
          ))}
        </div>
    </div>
    </>
  );
};

export default Blogs;
