import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import {getRole} from "../../../storage/storage"
const role = getRole();
console.log(role);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openLogin = () => {
    setIsLoginVisible(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeLogin = () => {
    setIsAnimating(false);
    setTimeout(() => setIsLoginVisible(false), 300);
  };
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

  

  return (
    <header className="w-full">
      <nav className="w-full py-6 px-4 md:px-10 bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="text-2xl  text-black  tracking-wide">
            HOUSE OF ADA
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex text-lg space-x-8  text-black">
            <Link to="/home" className="hover:underline flex items-center">
              New Arrivals
            </Link>
            <Link to="/product" className="hover:underline flex items-center">
              Winter
            </Link>
            {token && role === "ADMIN" && (
              <Link
                to="/admin"
                className="hover:underline flex items-center"
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Icons */}
          <div className="flex space-x-7 text-xl text-black">
            <Link to="/login">
              <User className="cursor-pointer hover:text-gray-500 transition hidden sm:flex" />
            </Link>
            {/* Favorites */}
            <div className="relative">
              <Heart className="cursor-pointer hover:text-gray-500 transition hidden sm:flex " />
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="cursor-pointer hover:text-gray-500 transition hidden sm:flex " />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-2xl ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-screen Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-6 text-xl text-black transition-opacity duration-300">
          {["New Arrivals", "Winter", "Contact us"].map((item, i) => (
            <Link
              key={i}
              to={`/${item.toLowerCase().replace(" ", "")}`}
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-500"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
