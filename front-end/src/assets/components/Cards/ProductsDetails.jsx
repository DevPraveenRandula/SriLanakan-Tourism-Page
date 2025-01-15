import React, { useEffect, useState } from "react";
import Navbar from "../../../assets/components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInastance";
import TourismData from "../Data/ProductDetail";
import ProductDetailCard from "./ProductDetailCard";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    const foundProduct = TourismData.find((p) => p.id === parseInt(id, 10));
    setProduct(foundProduct || null);
  }, [id]);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return <h2 className="text-center text-red-500">Product Not Found</h2>;
  }

  // Filter related products by category
  const relatedProducts = TourismData.filter(
    (item) =>
      item.id !== parseInt(id, 10) && item.category === product.category
  );

  return (
    <>
      <Navbar userInfo={userInfo} />

      {/* Banner Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            {product.name}
          </h1>
        </div>
      </section>

      {/* Product Details Section */}
      <div className="container mx-auto py-10 px-4 md:px-8">
        <h1 className="text-5xl font-extrabold text-black mb-6">{product.name}</h1>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Product Highlights */}
        <h2 className="text-2xl font-bold text-black mb-4">Product Highlights</h2>
        <ul className="list-disc pl-8 text-lg text-gray-800 space-y-2">
          {product.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>

        {/* Product Pricing */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-black mb-2">Price</h2>
          <p className="text-lg text-gray-800">${product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="container mx-auto py-10 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-black mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {relatedProducts.map((mask) => (
            <ProductDetailCard key={mask.id} product={mask} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
