import React, { useEffect, useState } from "react";
import Navbar from '../assets/components/Navbar';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosInastance';

import BANNER_IMAGE from "../assets/Images/Banners/img-3.jpg";
import EVENT1_IMAGE from "../assets/Images/Events/img-2.png";
import EVENT2_IMAGE from "../assets/Images/Events/img-3.jpg";
import EVENT3_IMAGE from "../assets/Images/Events/img-4.jpg";
import EVENT4_IMAGE from "../assets/Images/Events/img-5.png";
import EVENT5_IMAGE from "../assets/Images/Events/img-6.jpeg";
import EVENT6_IMAGE from "../assets/Images/Events/img-7.jpg";

import EventCard from "../assets/components/Cards/EventCard";

const EventPage = () => {
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
      <Navbar userInfo={userInfo} adventurePage={false} />

      {/* Banner Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={BANNER_IMAGE}
          alt="Events"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Upcoming Events
          </h1>
        </div>
      </section>

      {/* Event Sections */}
      <div className="pt-20 px-6">
        <EventCard
          title="Esala Perahera (Kandy)"
          description="One of the grandest Buddhist festivals in Asia, featuring a spectacular procession with beautifully adorned elephants, traditional dancers, fire performers, and drummers. It celebrates the sacred tooth relic of Buddha at the Temple of the Tooth in Kandy."
          image={EVENT1_IMAGE}
          reverse={false}
        />

        <EventCard
          title="Sinhala and Tamil New Year (Aluth Avurudda)"
          description="A traditional New Year celebration marked by rituals, cultural games, delicious sweets, and a focus on family and harmony. Celebrations include oil anointing, cleaning homes, and fireworks."
          image={EVENT2_IMAGE}
          reverse={true}
        />

        <EventCard
          title="Nallur Festival (Jaffna)"
          description="A significant Hindu festival held at the Nallur Kandaswamy Temple in Jaffna, lasting nearly 25 days. The event includes vibrant parades, traditional music, and intricate temple rituals."
          image={EVENT5_IMAGE}
          reverse={false}
        />

        <EventCard
          title="Independence Day"
          description="A national celebration of Sri Lanka's independence from British rule, featuring flag-hoisting ceremonies, military parades, and cultural performances."
          image={EVENT4_IMAGE}
          reverse={true}
        />

        <EventCard
          title="Colombo Fashion Week"
          description="A premier event showcasing the talent of Sri Lankan and international designers. This event highlights the nation's growing fashion industry."
          image={EVENT6_IMAGE}
          reverse={false}
        />
      </div>
    </div>
  );
};

export default EventPage;
