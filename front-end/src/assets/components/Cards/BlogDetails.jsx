import React, { useEffect, useState } from "react";
import Navbar from "../../../assets/components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInastance";
import BlogsData from "../Data/BlogsData";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the blog ID from the URL parameters
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } else {
        setError("An error occurred while fetching user data.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // Find the blog details based on the ID
  const blog = BlogsData.find((blog) => blog.id === parseInt(id));

  // If the blog is not found, show an error message
  if (!blog) {
    return <h1 className="text-center text-2xl font-bold mt-10">Blog not found!</h1>;
  }

  // Set dynamic page title
  useEffect(() => {
    document.title = `${blog.title} | Blog Details`;
  }, [blog]);

  // Function to replace ** with <strong>
  const renderContent = (content) => {
    const parts = content.split("**");
    return parts.map((part, index) =>
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <>
      <Navbar userInfo={userInfo} />
      
      {/* Banner Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            {blog.title}
          </h1>
        </div>
      </section>

      {/* Details Section */}
      <div className="container mx-auto py-10 px-4 md:px-8">
        <h1 className="text-5xl font-extrabold text-black mb-6">{blog.topic}</h1>
        <div className="flex flex-col md:flex-row items-center text-gray-600 text-sm mb-6">
          <p className="mr-4">
            <strong>Author:</strong> {blog.author}
          </p>
          <p>
            <strong>Date:</strong> {blog.date}
          </p>
        </div>

        {/* Tags Section */}
        <h2 className="text-2xl font-bold text-black mb-4">Tags</h2>
        {blog.tags.length > 0 ? (
          <ul className="flex space-x-4">
            {blog.tags.map((tag, index) => (
              <li
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-800"
              >
                #{tag}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tags available for this blog.</p>
        )}

        {/* Blog Content */}
        <p className="text-lg text-gray-800 leading-relaxed mb-6 whitespace-pre-line">
          {blog.content ? renderContent(blog.content) : "No content available for this blog."}
        </p>
      </div>
    </>
  );
};

export default BlogDetails;
