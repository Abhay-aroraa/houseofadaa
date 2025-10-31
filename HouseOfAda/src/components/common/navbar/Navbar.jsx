import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User, Heart, ShoppingCart, Menu, Search, X } from "lucide-react";
import { removeAuthToken } from "../../../storage/storage";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const[userid , setUserId] = useState(localStorage.getItem("userId"))
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // for desktop dropdown
  const drawerRef = useRef(null);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("authtoken"));
    setRole(localStorage.getItem("role"));
  }, [location]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setToken(null);
    setRole(null);
    setUserId(null);
    setMobileOpen(false);
    alert("Logout successful!");
    navigate("/home");
  };

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <nav className="w-full py-3 px-4 md:px-10">
        <div className="flex items-center justify-between">
          {/* Hamburger */}
          <Menu
            className="md:hidden cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          />

          {/* Logo */}
          <Link to="/home" className="text-2xl font-normal tracking-wide">
            HOUSE OF ADA
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring focus:ring-gray-200 transition"
              />
              <Search className="absolute right-3 top-2 cursor-pointer text-gray-500" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-xl relative">
            {/* Desktop Login/Profile */}
            {token ? (
              <div className="hidden md:flex relative" ref={dropdownRef}>
                <User
                  className="hover:text-gray-600 cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                    <Link
                      to={role === "ADMIN" ? "/admin/dashboard" : "/profile"}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      {role === "ADMIN" ? "Admin Dashboard" : "Profile"}
                    </Link>

                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex">
                <User className="hover:text-gray-600 cursor-pointer" />
              </Link>
            )}

            {/* Wishlist */}
                <Link to = "/wishlist">
            <Heart className="cursor-pointer hover:text-gray-600 hidden md:flex" />
</Link>
            {/* Mobile Search */}
            <Search
              className="cursor-pointer hover:text-gray-600 md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            />

            {/* Cart */}
            <Link to="/cart">
              <ShoppingCart className="cursor-pointer hover:text-gray-600" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Expanding Search */}
      {showSearch && (
        <div className="md:hidden bg-white px-4 py-3 shadow flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full w-full px-4 py-2 focus:outline-none"
          />
          <X
            className="cursor-pointer text-gray-500"
            onClick={() => setShowSearch(false)}
          />
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          ref={drawerRef}
          className="md:hidden bg-white px-6 py-4 space-y-4 shadow animate-slide-down"
        >
          <Link to="/home" className="block text-lg">
            New Arrivals
          </Link>

          {token && role?.toUpperCase() === "ADMIN" && (
            <Link to="/admin" className="block text-lg">
              Admin Dashboard
            </Link>
          )}

          {/* Conditional Login/Profile */}
          {token ? (
            <>
              <Link to="/profile" className="block text-lg">
                My Profile
              </Link>
              <button
                className="block text-lg text-left w-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block text-lg">
              Login
            </Link>
          )}

          <Link to="/wishlist" className="block text-lg">
            Wishlist
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
