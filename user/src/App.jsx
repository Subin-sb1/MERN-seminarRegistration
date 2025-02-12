import React, { useState,useEffect } from "react"
import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/login"
import Signup from "./pages/Signup"
import Status from "./pages/Status"
import PasswordReset from "./pages/PasswordReset"
import Dashboard from "./pages/Dashboard"
import { ToastContainer} from 'react-toastify';
import { Navigate } from "react-router-dom";
import Contactus from "./pages/contactus"
import EditForm from "./pages/EditForm"



export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const razorpayUrl = import.meta.env.VITE_RAZORPAY_KEY_ID



function App() {

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token"); 

    if (!isAuthenticated) {
        return <Navigate to="/" replace />; // Redirect to home if not logged in
    }

    return children; // Allow access if logged in
};

  const [token,setToken] = useState(localStorage.getItem?localStorage.getItem('token'):'');
  useEffect(()=>{
       localStorage.setItem('token',token)
  },[token])







  return (
   <div>
    <ToastContainer/>
     <Routes>
     <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/passwordreset" element={<PasswordReset/>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard setToken={setToken}/></PrivateRoute>} />
      <Route path="/status" element={<Status setToken={setToken}/>} />
      <Route path="/contactus" element={<Contactus setToken={setToken}/>}></Route>
      <Route path="/editform" element={<EditForm setToken={setToken}/>}></Route>
     </Routes>
   </div>
  )
}

export default App
