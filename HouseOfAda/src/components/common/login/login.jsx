import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../store/api/Authapi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap();
        console.log(response.role);

      if (response?.token) {
       localStorage.setItem("authtoken", response.token);
       localStorage.setItem("role",response.role);
       localStorage.setItem("userId",response.userId);
       
        alert("User logged in successfully");
        navigate("/home");
      } else {
        alert("Login failed");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black px-4">
      <div className="w-full max-w-[400px] md:max-w-[500px] p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-light mb-8 text-center">SIGN IN</h2>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm md:text-base mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 md:p-4 text-black text-base md:text-lg focus:outline-none border-b border-black"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-sm md:text-base mb-2">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-3 md:p-4 pr-10 text-black text-base md:text-lg focus:outline-none border-b border-black"
          />
          <span
            className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </span>
        </div>

        {/* Forgot Password */}
        <div className="mb-8 text-right">
          <Link to="#" className="text-black text-sm md:text-base hover:underline">
            Lost your password?
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleLogin}
            className="flex-1 bg-black text-white py-3 md:py-4 rounded text-base md:text-lg"
          >
            SIGN IN
          </button>

          <Link to="/signup" className="flex-1">
            <button className="w-full bg-white text-black py-3 md:py-4 rounded text-base md:text-lg border-b border-black">
              CREATE YOUR ACCOUNT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
