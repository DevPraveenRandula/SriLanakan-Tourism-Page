import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Adventure from "./pages/Adventure";
import Blogs from "./pages/Blogs";
import PostDetails from "./assets/components/Cards/PostDetails";
import ProductsDetails from "./assets/components/Cards/ProductsDetails";
import BlogDetails from "./assets/components/Cards/BlogDetails";
import Events from "./pages/Events";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/adventure" element={<Adventure />} />
          <Route path="/event" element={<Events />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<ProductsDetails />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/product/event" element={<Events />} />
          <Route path="/post/event" element={<Events />} />
          <Route path="/blogs/event" element={<Events />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
};

// Define the Root component to handle the initial redirect
const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
