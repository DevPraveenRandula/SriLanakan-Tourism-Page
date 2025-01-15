import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../assets/components/Navbar";
import ProductCard from "../assets/components/Cards/ProductCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInastance";
import ProductsData from "../assets/components/Data/ProductsData";

import BANNER_IMAGE from "../assets/Images/Banners/img-3.jpg";

const Products = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Masks");

  // Fetch user info
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/get-user");
        if (response.data?.user) {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          console.error("Error fetching user info:", error.message);
        }
      }
    };
    getUserInfo();
  }, [navigate]);
  // Scroll to the top when the component is loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });  // Scroll smoothly to top
  }, []);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    return ProductsData.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Navbar userInfo={userInfo} adventurePage={false} />

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

      {/* Horizontal Category Section */}
      <div className="flex justify-center items-center bg-gray-100 py-4 px-6 rounded-full shadow-md mt-6 mx-auto w-4/5">
        {["Masks", "Spices", "Food", "Industrial Goods"].map(
          (category) => (
            <div
              key={category}
              className={`mx-4 px-6 py-2 rounded-full cursor-pointer transition-colors ${
                selectedCategory === category
                  ? "bg-white text-blue-500 shadow-md"
                  : "bg-transparent text-black hover:bg-gray-200"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          )
        )}
      </div>

      {/* Products Section */}
      <div className="mt-8 px-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No products available for this category.
          </p>
        )}
      </div>
    </>
  );
};

export default Products;
