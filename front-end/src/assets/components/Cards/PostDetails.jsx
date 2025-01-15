import React, { useEffect, useState } from "react";
import Navbar from "../../../assets/components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInastance";
import { posts } from "../Data/posts";


import Img1 from "../../Images/DailyPost/img-1.jpeg";
import Img2 from "../../Images/DailyPost/img-2.jpeg";
import Img3 from "../../Images/DailyPost/img-3.jpeg";
import Img4 from "../../Images/DailyPost/img-4.jpg";
import Img5 from "../../Images/DailyPost/img-5.jpg";
import Img6 from "../../Images/DailyPost/img-6.jpg";



const DetailPostCard = [
  {
    id: 1,
    image: Img1,
    title: "Exploring the Beach",
    description: "Sri Lanka's beaches offer crystal-clear waters, golden sands, and a relaxing atmosphere.",
    price: 120,
    location: "#Hiriketiya",
    category: "Adventure",
  },
  {
    id: 2,
    image: Img2,
    title: "Nine Arches Bridge",
    description: "The Nine Arches Bridge in Ella is a colonial-era marvel surrounded by lush greenery.",
    price: 7000,
    location: "#Ella",
    category: "Cultural",
  },
  {
    id: 3,
    image: Img3,
    title: "Safaris",
    description: "Explore Sri Lanka’s national parks to spot elephants, leopards, and exotic birds.",
    price: 6500,
    location: "#Yala",
    category: "Adventure",
  },
  {
    id: 4,
    image: Img4,
    title: "Experience the Serene Beaches",
    description: "Relax on Sri Lanka’s tranquil beaches, from Mirissa to Trincomalee.",
    price: 6500,
    location: "#Mirissa",
    category: "Adventure",
  },
  {
    id: 5,
    image: Img5,
    title: "Ancient Rock Fortress",
    description: "Sigiriya, or Lion Rock, is a UNESCO site rich in history and culture.",
    price: 7000,
    location: "#Sigiriya",
    category: "Cultural",
  },
  {
    id: 6,
    image: Img6,
    title: "Most Stunning Hiking Trails",
    description: "Explore Horton Plains and Adam’s Peak for breathtaking views and adventures.",
    price: 6000,
    location: "#HortonPlains",
    category: "Adventure",
  },
];



const PostDetails = () => {
  
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

  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id)); // Ensure type consistency
  const relatedPosts = DetailPostCard.filter((blog) => blog.id !== Number(id)); // Exclude the current post

    // Automatically scroll to top on navigation
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Adds a smooth scrolling effect
      });
    }, [id]); // Triggers whenever `id` changes

  if (!post) {
    return <h2 className="text-center text-red-500">Post Not Found</h2>;
  }

  return (
    <>
      <Navbar userInfo={userInfo} adventurePage={true} />
      {/* Banner Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            {post.topic}
          </h1>
        </div>
      </section>

      {/* Details Section */}
      <div className="container mx-auto py-10 px-4 md:px-8">
        <h1 className="text-5xl font-extrabold text-black mb-6">{post.title}</h1>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          {post.description}
        </p>

        <h2 className="text-2xl font-bold text-black mb-4">Popular Spots</h2>
        <ul className="list-disc pl-8 text-lg text-gray-800 space-y-2">
          {post.content.split("\n").map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>


      {/* Related Posts Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Related Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((relatedPost) => (
            <div
              key={relatedPost.id}
              className="p-4 border rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer"
              onClick={() => navigate(`/post/${relatedPost.id}`)} // Navigate to the related post page
            >
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="h-[220px] w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{relatedPost.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{relatedPost.description}</p>
                <div className="mt-auto">
                  <p className="text-gray-700">
                    <strong>Location:</strong> {relatedPost.location}
                  </p>
                  <p className="text-gray-700">
                    <strong>Price:</strong> ${relatedPost.price}
                  </p>
                  <p className="text-gray-700">
                    <strong>Category:</strong> {relatedPost.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetails;
