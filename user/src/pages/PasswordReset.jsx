import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";





const PasswordReset = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isEmailValid = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  
  const handleSendOtp = async () => {
    if (!isEmailValid(email)) {
      alert("Please enter a valid email.");
      return;
    }
    try {
      console.log(backendUrl); 
      await axios.post(backendUrl+'/request-otp', { email });
      setOtpSent(true);
      setCountdown(10);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      alert("Error sending OTP. Try again later.");
    }
  };

  const handleReset = async () => { 
    try {
       
      const response = await axios.post(backendUrl+'/reset-password', { email,password,otp},
        { headers: { "Content-Type": "application/json" } ,
        validateStatus: (status) => status < 500 
      }
       );
       console.log("after axios")
      console.log(response);
      
      if (response.status == 200) {
        
        toast.success(response.data.message, {
          autoClose: 1000 
      });
      navigate("/login"); 
      } else {
      
        toast.error(response.data.message);

      }
    } catch (error) {
      alert("error occurred. Please try again.");
    }
  };

  const isFormValid = email && password.length >= 6;

  return (
    
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="text-blue-400 text-sm mt-2"
            onClick={handleSendOtp}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Resend OTP in ${countdown}s` : "Get OTP"}
          </button>
        </div>

        {otpSent && (
          <div className="mb-4">
            <label className="block text-gray-300">Enter OTP</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-300">Enter New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className={`w-full py-2 mt-4 text-lg font-semibold rounded   ${isFormValid ? "bg-blue-500" : "bg-gray-500 cursor-not-allowed"}` }
          disabled={!isFormValid}
          onClick={handleReset}
        > 
          Reset
        </button>
     
      </div>
      
    </div>
    
  );
};

export default PasswordReset;
