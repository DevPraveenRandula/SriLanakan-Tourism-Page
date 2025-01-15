import React, { useEffect, useState } from 'react';
import LOGO from '../Images/logo.png';
import ProfileInfo from './Cards/ProfileInfo';
import SearchBar from './Input/SearchBar';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userInfo }) => {
  const [isScrolled, setisScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Add this state
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setisScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // Clear the search input
  };

  const pages = {
    "Home": "/dashboard",
    "Adventure": "/adventure",
    "Blogs": "/blog",
    "Events": "/event",
    "About Us": "/about-us",
    "Products": "/product",
  };

  return (
    <div
      className={`fixed top-0 w-full z-10 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <img
          src={LOGO}
          alt="Tourism Logo"
          className={`transition-all ${isScrolled ? "h-12" : "h-9"}`}
        />

        <div
          className={`hidden md:flex items-center space-x-6 transition-all ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
        >
          <a href="/dashboard" className="hover:text-blue-400">
            Home
          </a>
          <a href="/adventure" className="hover:text-blue-400">
            Adventure
          </a>
          <a href="/blog" className="hover:text-blue-400">
            Blogs
          </a>
          <a href="event" className="hover:text-blue-400">
            Events
          </a>
          <a href="/product" className="hover:text-blue-400">
            Products
          </a>
          <a href="/about-us" className="hover:text-blue-400">
            About Us
          </a>
        </div>

        {isToken ? (
          <div className="flex items-center space-x-4">
            <SearchBar
              pages={pages}
              value={searchQuery} // Pass searchQuery to the SearchBar
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
              handleSearch={handleSearch}
              onClearSearch={handleClearSearch}
            />
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
