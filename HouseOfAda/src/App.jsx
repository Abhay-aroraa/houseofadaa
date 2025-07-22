import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/product.jsx/product";
import Cart from "./pages/Cart/Cart";
import ContactUs from "./pages/contact/Contact";
import { useState, useEffect } from "react";
import Navbar from "./pages/navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import SignUpForm from "./pages/signup/signup";
import ProductDetails from "./pages/Productdetails/Productdetails";

export default function App() {
  const [cart, setCart] = useState(() => {
   
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <div className="w-full min-h-screen">
        {/* Navbar */}
        <Navbar cart={cart} />

        {/* Page Content */}
        <div className="w-full mt-[80px]">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<Products cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/create-account" element={<SignUpForm />} />
            <Route path="/product/:id" element={<ProductDetails cart={cart} setCart={setCart} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
