import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import account from "../../assets/images/CreateAccount.jpg"

export default function SignUpForm({ onClose }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const nvg = useNavigate();
    const togglePassword = () => setShowPassword((prev) => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-200 p-6 my-10">
            <div className="bg-white w-full max-w-5xl p-16 rounded-xl shadow-2xl flex gap-16 items-center">
                {/* Left Section - Illustration */}
                <div className="hidden md:block w-1/2">
                    <img 
                        src= {account}
                        alt="Signup Illustration" 
                        className="w-full h-auto"
                    />
                </div>
                
                {/* Right Section - Form */}
                <div className="w-full md:w-1/2">
                    {/* Close Button */}
                  
                    
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">Create an Account</h2>

                    {/* Name */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-lg"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold text-gray-700">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-lg"
                        />
                    </div>

                    {/* Password Inputs */}
                    <div className="flex gap-6">
                        {/* Password */}
                        <div className="mb-6 relative w-1/2">
                            <label className="block text-lg font-semibold text-gray-700">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-lg"
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute top-12 right-4 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6 relative w-1/2">
                            <label className="block text-lg font-semibold text-gray-700">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-lg"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPassword}
                                className="absolute top-12 right-4 text-gray-500"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-6 mt-8">
                        <button className="w-full bg-[#344C3D] text-white py-4 text-lg rounded-lg font-semibold hover:bg-[rgb(21,37,28)] transition duration-200">
                            REGISTER
                        </button>
                        <button
                           
                            onClick={() => nvg("/home")}
                            className="w-full border border-black py-4 text-lg rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
