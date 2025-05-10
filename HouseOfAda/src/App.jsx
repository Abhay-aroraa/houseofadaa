import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/product.jsx/product";
import Cart from "./pages/Cart/Cart";
import ContactUs from "./pages/contact/Contact";
import { useState } from "react";
import Navbar from "./pages/navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import SignUpForm from "./pages/signup/signup";

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="w-full min-h-screen">
        {/* Navbar */}
        <Navbar cart={cart} />

        {/* Page Content */}
        <div className="w-full mt-[80px]">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/create-account" element={<SignUpForm/>}/>
          </Routes>
        </div>

        <Footer/>
      </div>
    </Router>
  );
}
