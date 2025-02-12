import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";





const Login = ({setToken}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isEmailValid = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };






    const handleReset = () => {
        navigate("/passwordreset"); // Navigate to password reset page
    };


  const handleLogin = async () => { 
    try {
        console.log({email,password})
      const response = await axios.post(backendUrl+'/login', { email, password},
        { headers: { "Content-Type": "application/json" } ,
        validateStatus: (status) => status < 500 
      }
       );
       console.log("after axios")
      console.log(response);
      
      if (response.data.success) {
        
        toast.success(response.data.message, {
          autoClose: 1000 
      });
          setToken(response.data.token)


          setTimeout(() => {
            if (response.data.success) {
                navigate("/dashboard");  // Redirect to Dashboard after delay
            } else {
                navigate("/login");   // Redirect to Registration Page after delay
            }
        }, 1000);

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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
        <button
    onClick={handleReset}
    className="w-full py-2 text-blue-500 hover:underline"
>
    Reset Password
</button>

  
        <button
          className={`w-full py-2 mt-4 text-lg font-semibold rounded ${isFormValid ? "bg-blue-500" : "bg-gray-500 cursor-not-allowed"}`}
       
          onClick={handleLogin}
        > 
          Login
        </button>
     
      </div>
      
    </div>
    
  );
};

export default Login;
