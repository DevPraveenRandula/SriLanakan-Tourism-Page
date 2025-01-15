import React, { useEffect, useState } from "react";
import Navbar from '../assets/components/Navbar';
import useUserLocation from '../assets/components/Input/getUserLocation';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosInastance';
import BANNER_IMAGE from "../assets/Images/Banners/img-4.jpg";

const AboutUs = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const userLocation = useUserLocation();

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to send the message.');
    }
  };

  return (
    <>
      <Navbar userInfo={userInfo} />

      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={BANNER_IMAGE}
          alt="Discover Sri Lanka"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Discover the Beauty of Sri Lanka
          </h1>
        </div>
      </section>

      {/* About Us Content Section */}
      <section className="max-w-4xl mx-auto py-12 px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">ABOUT US</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At <b>Explore Sri Lanka</b>, our mission is to showcase the unparalleled beauty, rich culture, and warm hospitality of our island nation. From golden beaches and lush forests to ancient temples and vibrant cities, Sri Lanka offers a diverse range of experiences for every traveler.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our platform connects tourists with authentic local experiences, sustainable tourism practices, and exceptional hospitality. Whether you're here for adventure, relaxation, or cultural immersion, Sri Lanka welcomes you with open arms.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Join us in exploring this breathtaking island and creating memories that will last a lifetime.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact-section">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Get In Touch With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold mb-4">We Are Here For You</h3>
              <p className="text-gray-700 mb-4">
                For inquiries about travel plans, tourism projects, or collaborations, feel free to get in touch with us.
              </p>
              <ul className="space-y-2">
                <li><strong>📍 Address:</strong> Colombo, Sri Lanka</li>
                <li><strong>📞 Phone:</strong> +94 71 763 3534</li>
                <li><strong>✉️ Email:</strong> praveenrandula221@gmail.com</li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a href="https://web.facebook.com/profile.php?id=61551057240706" className="text-blue-500 hover:underline">Facebook</a>
                <a href="#" className="text-blue-500 hover:underline">Twitter</a>
                <a href="#" className="text-blue-500 hover:underline">Instagram</a>
              </div>
            </div>
            
            {/* Map Section */}
            <div className="rounded-md shadow-md overflow-hidden">
              <h3 className="text-xl font-bold mb-2 text-center">Our Location</h3>
              {userLocation ? (
                <iframe
                  title="My Location"
                  src={`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}&output=embed`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              ) : (
                <p className="text-center text-gray-700">Fetching your location...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-section" className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Contact Us</h2>
          <p className="text-center text-gray-500 mb-8">
            We would love to hear from you!
          </p>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-md overflow-hidden shadow-md">
              <img src="/Images/About-img.jpg" alt="Contact" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="flex flex-col space-y-4">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="p-3 border rounded-md" required />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="p-3 border rounded-md" required />
              <input type="text" name="phone" placeholder="Your Contact Number" value={formData.phone} onChange={handleChange} className="p-3 border rounded-md" required />
              <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} className="p-3 border rounded-md" rows="4" required></textarea>
              <button type="submit" className="p-3 bg-black text-white rounded-md hover:bg-gray-800">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
