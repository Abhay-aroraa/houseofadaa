import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Heart, ShoppingCart, Menu, Search, X } from "lucide-react";
import { removeAuthToken } from "../../../storage/storage";
import { useSearchProductsQuery } from "../../../store/api/SearchApi";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("authtoken"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const drawerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounce keyword
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedKeyword(keyword), 400);
    return () => clearTimeout(handler);
  }, [keyword]);

  // Fetch products
  const { data: searchResults, isFetching } = useSearchProductsQuery(
    debouncedKeyword,
    { skip: !debouncedKeyword }
  );

  // Update token & role when route changes
  useEffect(() => {
    setToken(localStorage.getItem("authtoken"));
    setRole(localStorage.getItem("role"));
  }, [location]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
      if (!e.target.closest(".profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = () => {
    removeAuthToken();
    setToken(null);
    setRole(null);
    setShowProfileDropdown(false);
    setMobileOpen(false);
    alert("Logout successful!");
    navigate("/home");
  };

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <nav className="w-full py-3 px-4 md:px-10 flex items-center justify-between">
        {/* Mobile Menu */}
        <Menu
          className="md:hidden cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        />

        {/* Logo */}
        <Link to="/home" className="text-2xl font-normal tracking-wide">
          HOUSE OF ADA
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center relative" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring focus:ring-gray-200 transition"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => keyword && setShowSearchDropdown(true)}
          />
          <Search className="absolute right-3 top-2 text-gray-500" />

          {showSearchDropdown && keyword && (
            <div className="absolute top-11 left-0 w-64 bg-white border border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
              {isFetching ? (
                <p className="p-2 text-gray-500">Loading...</p>
              ) : searchResults && searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setShowSearchDropdown(false);
                      setKeyword("");
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {product.name}
                  </div>
                ))
              ) : (
                <p className="p-2 text-gray-500">No products found</p>
              )}
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-xl relative">
          {/* Profile / Login */}
          {token ? (
            <div className="hidden md:flex relative profile-dropdown">
              <User
                className="hover:text-gray-600 cursor-pointer"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              />
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                  <Link
                    to={role === "ADMIN" ? "/admin/dashboard" : "/profile"}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowProfileDropdown(false)}
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
          <Link to="/wishlist">
            <Heart className="cursor-pointer hover:text-gray-600 hidden md:flex" />
          </Link>

          {/* Mobile Search */}
          <Search
            className="cursor-pointer hover:text-gray-600 md:hidden"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          />

          {/* Cart */}
          <Link to="/cart">
            <ShoppingCart className="cursor-pointer hover:text-gray-600" />
          </Link>
        </div>
      </nav>

      {/* Mobile Search */}
      {showMobileSearch && (
        <div className="md:hidden bg-white px-4 py-3 shadow flex flex-col space-y-2 relative" ref={dropdownRef}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-full w-full px-4 py-2 focus:outline-none"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setShowSearchDropdown(true);
              }}
            />
            <X
              className="cursor-pointer text-gray-500"
              onClick={() => {
                setShowMobileSearch(false);
                setKeyword("");
              }}
            />
          </div>

          {showSearchDropdown && keyword && (
            <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
              {isFetching ? (
                <p className="p-2 text-gray-500">Loading...</p>
              ) : searchResults && searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setShowSearchDropdown(false);
                      setShowMobileSearch(false);
                      setKeyword("");
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {product.name}
                  </div>
                ))
              ) : (
                <p className="p-2 text-gray-500">No products found</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div ref={drawerRef} className="md:hidden bg-white px-6 py-4 space-y-4 shadow animate-slide-down">
          <Link to="/home" className="block text-lg">
            New Arrivals
          </Link>

          {token && role?.toUpperCase() === "ADMIN" && (
            <Link to="/admin/dashboard" className="block text-lg">
              Admin Dashboard
            </Link>
          )}

          {token ? (
            <>
              <Link to="/profile" className="block text-lg">
                My Profile
              </Link>
              <button className="block text-lg text-left w-full" onClick={handleLogout}>
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
