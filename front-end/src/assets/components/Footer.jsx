import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat text-white h-[600px] flex items-start pt-10"
      style={{
        backgroundImage: "url('/Images/img-6.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {["Home", "Adventure", "Map", "Blog", "Events", "Products", "About"].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-blue-400 transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Extra Links */}
        <div>
          <h3 className="font-bold text-xl mb-6">Extra Links</h3>
          <ul className="space-y-4">
            {["My Account", "My Order", "My Wishlist", "Ask Questions", "Terms Of Use", "Privacy Policy"].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-blue-400 transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-xl mb-6">Contact Info</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <FiPhone />
              <span>071-7633534</span>
            </li>
            <li className="flex items-center space-x-3">
              <FiPhone />
              <span>071-7633534</span>
            </li>
            <li className="flex items-center space-x-3">
              <FiMail />
              <a href="mailto:praveenrandula221@gmail.com" className="hover:text-blue-400 transition">
                praveenrandula221@gmail.com
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <FiMapPin />
              <span>Colombo, Sri Lanka</span>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-bold text-xl mb-6">Follow Us</h3>
          <ul className="flex space-x-6">
            <li className="hover:scale-110 transition-transform">
              <a
                href="https://web.facebook.com/profile.php?id=61551057240706"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-400 transition"
              >
                <FaFacebook />
              </a>
            </li>
            <li className="hover:scale-110 transition-transform">
              <a
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-400 transition"
              >
                <FaTwitter />
              </a>
            </li>
            <li className="hover:scale-110 transition-transform">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-400 transition"
              >
                <FaInstagram />
              </a>
            </li>
            <li className="hover:scale-110 transition-transform">
              <a
                href="https://www.linkedin.com/in/praveen-randula-2ba868294/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-400 transition"
              >
                <FaLinkedin />
              </a>
            </li>
            <li className="hover:scale-110 transition-transform">
              <a
                href="https://github.com/DevPraveenRandula"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-400 transition"
              >
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-lg font-light">
          Made With ❤ In <span className="text-blue-500">Sri Lanka</span>
        </p>
        <p className="text-sm">Copyright © 2025 - All Rights Reserved!</p>
      </div>
    </footer>
  );
};

export default Footer;
