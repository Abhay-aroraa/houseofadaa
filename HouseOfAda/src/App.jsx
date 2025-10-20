import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/Cart/Cart";
import ContactUs from "./pages/contact/Contact";
import { useState, useEffect } from "react";
import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import SignUpForm from "./components/common/signup/signup";
import Login from "./components/common/login/login";
import AddProduct from "./pages/admin/products/addproduct/addProduct";
import ProductDetails from "./components/common/productDetails/productDetails";
import AdminDashboard from "./pages/admin/dashboard/adminDashboard";
import List from "./pages/admin/products/productList/productList";
import AdminLayout from "./pages/admin/layout/adminLayout"; // ✅ layout
import UserList from "./pages/admin/users/userList";

export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Navbar />

        <div className="w-full mt-[80px]">
          <Routes>
            {/* 🔹 Normal website routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* 🔹 Admin routes use AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="product-list" element={<List />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="user-list" element={<UserList/>} />
            </Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
