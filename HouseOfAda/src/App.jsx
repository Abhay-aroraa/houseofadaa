import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/Cart/Cart";

import { useState, useEffect } from "react";
import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import SignUpForm from "./components/common/signup/signup";
import Login from "./components/common/login/login";
import AddProduct from "./pages/admin/products/addproduct/addProduct";
import ProductDetails from "./components/common/productDetails/productDetails";
import AdminDashboard from "./pages/admin/dashboard/adminDashboard";
import List from "./pages/admin/products/productList/productList";
import AdminLayout from "./pages/admin/layout/adminLayout";
import UserList from "./pages/admin/users/userList";
import AllOrders from "./pages/admin/orders/allOrders";
import OrderDetails from "./pages/admin/orders/orderDetails";
import Profile from "./pages/profile/profile";
import Address from "./pages/address/address";
import Wishlist from "./pages/wishlist/Wishlist";
import PrivateRoute from "./components/common/privateRoute/PrivateRoute";
import AdminRoute from "./components/common/privateRoute/AdminRoute";
import Contactus from "./components/common/ContactUs/Contactus";
import SizeChart from "./components/common/sizeChart/SizeChart";


export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Navbar />
        <div className="w-full mt-[80px]">
          <Routes>
            {/* 🔹 Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/contactus" element={<Contactus/>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/sizechart" element={<SizeChart/>}/>

            {/* 🔒 Private (User) routes */}
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/addresses"
              element={
                <PrivateRoute>
                  <Address />
                </PrivateRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <PrivateRoute>
                  <Wishlist />
                </PrivateRoute>
              }
            />

            {/* 🔒 Admin routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="product-list" element={<List />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="user-list" element={<UserList />} />
              <Route path="order-list" element={<AllOrders />} />
              <Route path="order-details/:id" element={<OrderDetails />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
