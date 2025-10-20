import React, { useState } from "react";
import { useVerifyOtpMutation } from "../../../store/api/Authapi";
import { useSendOtpMutation } from "../../../store/api/Authapi";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("user");
  const [otpSent, setOtpSent] = useState(false);
  const nvg = useNavigate();

  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation();

  const handleSendOtp = async () => {
    if (!name || !email || !password || password !== confirmPassword) {
      alert("Please fill all fields correctly");
      return;
    }

    try {
      const response = await sendOtp(email).unwrap();
      console.log("Response:", response);
      setOtpSent(true);
      alert(`OTP sent successfully to ${email}`);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      const response = await verifyOtp({ name, email, password, otp }).unwrap();
      console.log("Verification Response:", response);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response?.role || "USER");

        alert("OTP verified and user registered successfully!");
        nvg("/home");
      } else {
        alert("OTP verified, but no token received.");
      }
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOtp("");
      setOtpSent(false);
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP or registration failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[500px] md:max-w-[600px]">
        <h2 className="text-4xl font-bold text-center mb-8">SIGN UP</h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-4 text-black text-lg border-b border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 text-black text-lg border-b border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-4 text-black text-lg border-b border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full p-4 text-black text-lg border-b border-black focus:outline-none"
            />
          </div>

          {otpSent && (
            <div>
              <label className="block mb-2 font-medium">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-4 text-black text-lg border-b border-black focus:outline-none"
              />
            </div>
          )}
        </div>

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={sendingOtp}
            className="w-full mt-8 bg-black text-white py-4 rounded text-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {sendingOtp ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            disabled={verifyingOtp}
            className="w-full mt-8 bg-black text-white py-4 rounded text-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {verifyingOtp ? "Verifying..." : "Verify OTP & Register"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
