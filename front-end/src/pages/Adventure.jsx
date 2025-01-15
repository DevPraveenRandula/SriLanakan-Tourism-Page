import React, { useEffect, useState } from "react";
import Navbar from '../assets/components/Navbar';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosInastance';
import BANNER_IMAGE from "../assets/Images/Banners/img-1.jpg"; 

import CYCLING_IMAGE from "../assets/Images/Adventures/img-1.jpg";
import ZIPLINING_IMAGE from "../assets/Images/Adventures/img-2.jpg";
import WATER_RAFTING_IMAGE from "../assets/Images/Adventures/img-3.jpg";
import HIKING_IMAGE from "../assets/Images/Adventures/img-6.jpg";

const AdventurePage = () => {
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
    <div>
      <Navbar userInfo={userInfo} adventurePage={true} />
      
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={BANNER_IMAGE}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Discover the World
          </h1>
        </div>
      </section>

      <div className="pt-20 px-6">
        
        {/* Cycling Section */}
        <section className="flex flex-wrap justify-center items-center my-8">
          <div className="w-full md:w-1/2 px-4 mb-6">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
              Cycling
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Explore the scenic trails of Sri Lanka on a cycling adventure like no other. 
              Pedal through lush tea plantations, serene paddy fields, and charming villages, 
              immersing yourself in the island's natural beauty. Whether you're riding along 
              coastal roads or challenging rugged terrains, every path tells a unique story. 
              Perfect for adventurers and nature enthusiasts, cycling in Sri Lanka is a journey 
              of discovery and excitement.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <img
              src={CYCLING_IMAGE}
              alt="Cycling"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Ziplining Section */}
        <section className="flex flex-wrap justify-center items-center my-8">
          <div className="w-full md:w-1/2 px-4 order-last md:order-first">
            <img
              src={ZIPLINING_IMAGE}
              alt="Ziplining"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-6">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
              Ziplining
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Experience the thrill of soaring above the jungle canopy with ziplining in Sri Lanka. 
              Feel the rush as you glide through lush valleys and over towering trees, taking in 
              breathtaking views. Popular in adventure hotspots like Ella, ziplining combines 
              adrenaline with awe-inspiring scenery, making it a must-try for adventure enthusiasts.
            </p>
          </div>
        </section>

        {/* White Water Rafting Section */}
        <section className="flex flex-wrap justify-center items-center my-8">
          <div className="w-full md:w-1/2 px-4 mb-6">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
              White Water Rafting
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Tackle the roaring rapids of the Kelani River in Kitulgala, the heart of white water 
              rafting in Sri Lanka. With a mix of calm waters and thrilling rapids, this adventure 
              is perfect for both beginners and seasoned rafters. Surrounded by lush rainforests, 
              the experience promises excitement, teamwork, and stunning natural beauty.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <img
              src={WATER_RAFTING_IMAGE}
              alt="White Water Rafting"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Hiking Section */}
        <section className="flex flex-wrap justify-center items-center my-8">
          <div className="w-full md:w-1/2 px-4 order-last md:order-first">
            <img
              src={HIKING_IMAGE}
              alt="Hiking"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-6">
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
            Surfing in Hiriketiya
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Hiriketiya Beach, known as a hidden gem in Sri Lanka's southern coastline, offers
              an unforgettable surfing experience for both beginners and advanced surfers. The
              tranquil bay provides consistent waves, crystal-clear waters, and a laid-back
              atmosphere that captivates visitors. 
              <br />
              <br />
              Whether you're catching your first wave or perfecting your technique, Hiriketiya
              is the perfect spot to immerse yourself in the beauty of Sri Lanka while riding
              the ocean waves. Don't forget to enjoy the surrounding cafes and yoga retreats
              to complete your adventure.
            </p>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default AdventurePage;
