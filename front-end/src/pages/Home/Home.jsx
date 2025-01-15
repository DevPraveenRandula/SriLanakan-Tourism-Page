import React, { useState } from 'react';
import Navbar from '../../assets/components/Navbar';
import { useNavigate } from "react-router-dom"; 
import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInastance';
import BackgroundVideo from "../../assets/Images/RedDotSL.mp4";
import DailyPost from '../../assets/components/Cards/DailyPost';
import TouristComments from '../../assets/components/Cards/TouristComments';
import SubscribeSection from '../../assets/components/Cards/SubscribeNow';
import Footer from '../../assets/components/Footer';



const Home = () => {
  const Navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

 // Fetch user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        // Set user info if data exists
        setUserInfo(response.data.user);
      }
    }catch(error){
      if (error.response.status === 401) {
        // Clear Storage if Unauthorized
        localStorage.clear();
        Navigate("/login");// Redirect to Login
      }

    }
  }


  useEffect(() => {
    getUserInfo();
  }, [])


  const dailyPosts = [
    {
      id: 1,
      title: "Exploring the Beach",
      date: "25th Dec, 2024",
      author: "Admin",
      description: "Sri Lanka's beaches offer crystal-clear waters, golden sands, and a relaxing atmosphere.",
      image: "/Images/DailyPost/edited/img-1.jpeg",
    },
    {
      id: 2,
      title: "Nine Arches Bridge",
      date: "25th Dec, 2022",
      author: "Admin",
      description: "The Nine Arches Bridge in Ella is a colonial-era marvel surrounded by lush greenery.",
      image: "/Images/DailyPost/edited/img-2.jpeg",
    },
    {
      id: 3,
      title: "Safaris",
      date: "25th Dec, 2022",
      author: "Admin",
      description: "Explore Sri Lanka’s national parks to spot elephants, leopards, and exotic birds.",
      image: "/Images/DailyPost/edited/img-3.jpeg",
    },
    {
      id: 4,
      title: "Experience the Serene Beaches",
      date: "25th Dec, 2022",
      author: "Admin",
      description: "Relax on Sri Lanka’s tranquil beaches, from Mirissa to Trincomalee.",
      image: "/Images/DailyPost/edited/img-4.jpg",
    },
    {
      id: 5,
      title: "Ancient Rock Fortress",
      date: "25th Dec, 2022",
      author: "Admin",
      description: "Sigiriya, or Lion Rock, is a UNESCO site rich in history and culture.",
      image: "/Images/DailyPost/edited/img-5.jpg",
    },
    {
      id: 6,
      title: "Most Stunning Hiking Trails",
      date: "25th Dec, 2022",
      author: "Admin",
      description: "Explore Horton Plains and Adam’s Peak for breathtaking views and adventures.",
      image: "/Images/DailyPost/edited/img-6.jpg",
    },
  ];
  


  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className='relative'>
        <video 
          src={BackgroundVideo}
          className="w-full h-screen object-cover"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">
            Welcome to <span className="text-primary">Sri Lanka</span>
          </h1>
        </div>
      </div>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Discover the Enchanting Wonders of Sri Lanka
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hi, I’m Praveen! This is your ultimate guide to exploring the enchanting wonders of Sri Lanka. My tourism webpage is dedicated to showcasing the beauty, culture, and adventures that this incredible island has to offer. 
            From serene beaches and lush greenery to ancient landmarks and vibrant cities, let this platform inspire your next unforgettable journey through Sri Lanka.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Our Daily Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {dailyPosts.map((post) => (
             <DailyPost
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
                author={post.author}
                description={post.description}
                image={post.image}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <TouristComments />
      </section>
      <SubscribeSection />
      <Footer />
    </>
  )
}

export default Home
