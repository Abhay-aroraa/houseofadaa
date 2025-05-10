import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { User, Heart, ShoppingCart, ChevronDown, X, Eye, EyeOff } from "lucide-react";

const Navbar = ({ cart = [], favorites = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const openLogin = () => {
        setIsLoginVisible(true);
        setTimeout(() => setIsAnimating(true), 10);
    };

    const closeLogin = () => {
        setIsAnimating(false);
        setTimeout(() => setIsLoginVisible(false), 300);
    };

    return (
        <header className="w-full">
            <nav className="w-full py-6 px-4 md:px-10 bg-[#344C3D] shadow-md fixed top-0 left-0 z-50">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/home" className="text-2xl  text-[#f5f5dc] font-bold tracking-wide">
                        HOUSE OF ADA
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex text-lg space-x-8 font-semibold text-[#f5f5dc]">
                        {["Home", "Shop", "Product", "Blog", "Contact us"].map((item, i) => (
                            <Link
                                key={i}
                                to={`/${item.toLowerCase().replace(" ", "")}`}
                                className="hover:underline flex items-center"
                            >
                                {item}
                                <ChevronDown className="ml-1 h-5" />
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex space-x-5 text-xl text-[#f5f5dc]">
                        <User onClick={openLogin} className="cursor-pointer hover:text-gray-500 transition" />

                        {/* Favorites */}
                        <div className="relative">
                            <Heart className="cursor-pointer hover:text-gray-500 transition" />
                            {favorites?.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#54d9e1] text-[#f5f5dc] text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {favorites.length}
                                </span>
                            )}
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className="relative">
                            <ShoppingCart className="cursor-pointer hover:text-gray-500 transition" />
                            {cart?.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#54d9e1] text-[#f5f5dc] text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden text-2xl ml-2" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Full-screen Menu */}
            {isOpen && (
                <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-6 text-xl font-semibold text-black transition-opacity duration-300">
                    {["Home", "Shop", "Product", "Blog", "Contact us"].map((item, i) => (
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

            {/* Login Popup */}
            {isLoginVisible && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <div
                        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${isAnimating ? "translate-x-0" : "translate-x-full"
                            } overflow-y-auto`}
                        style={{ width: "100%", maxWidth: "550px" }}
                    >
                        {/* Close Button */}
                        <div className="flex justify-end p-4">
                            <X className="cursor-pointer hover:text-gray-500" onClick={closeLogin} />
                        </div>

                        {/* Login Form */}
                        <div className="px-8 py-4">
                            <h2 className="text-2xl font-semibold mb-6 text-center">SIGN IN</h2>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4 relative">
                                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-black pr-10"
                                />
                                <span
                                    className="absolute right-3 top-10 cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>

                            {/* Forgot Password */}
                            <div className="mb-6 text-sm text-right">
                                <a href="#" className="text-black hover:underline">Lost your password?</a>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <button className="flex-1 bg-[#344C3D] hover:hover:bg-[rgb(21,37,28)] text-white py-3 rounded transition">
                                    SIGN IN
                                </button>
                                <Link to="/create-account" className="flex-1">
                                    <button
                                        onClick={closeLogin}
                                        className="w-full border py-3  text-white  rounded bg-[#ceceb4]  hover:bg-gray-200transition"
                                    >
                                        CREATE YOUR ACCOUNT
                                    </button>
                                </Link>
                            </div>


                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
