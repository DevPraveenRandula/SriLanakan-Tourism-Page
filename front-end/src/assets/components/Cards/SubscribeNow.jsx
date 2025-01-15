import React, { useState } from "react";
import axios from "axios";

const SubscribeNow = () => {
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Call the backend API to send the email
      await axios.post("/api/subscribe", { email });

      // Show success message and reset email input
      setSuccessMessage(
        "Thank you for joining our travel community! Check your inbox for more updates."
      );
      setEmail("");
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      setErrorMessage(
        "There was an issue with your subscription. Please try again later."
      );
    }
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    setErrorMessage(""); // Clear error on focus
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  return (
    <section className="bg-gradient-to-r from-green-50 to-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Join Our Travel Community
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Subscribe to receive exclusive travel deals, expert destination
            tips, and inspiration for your next adventure. Your journey starts
            here!
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              className={`bg-white border rounded-l-md py-3 px-4 w-full focus:outline-none focus:ring-2 ${
                isEmailFocused
                  ? "focus:ring-blue-500 focus:border-blue-500"
                  : "focus:ring-green-500 focus:border-transparent"
              }`}
            />
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-r-md"
            >
              Subscribe
            </button>
          </form>

          {errorMessage && (
            <p className="text-red-600 mt-4">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 mt-4">{successMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubscribeNow;
