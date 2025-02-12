import React, { useState } from "react"
import { Routes,Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import AdminDashboard from "./pages/AdminDashboard"
import Login from "./pages/Login"
import Validate from "./pages/Validate"

export const razorpayUrl = import.meta.env.VITE_RAZORPAY_KEY_ID
export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const [token,setToken] = useState('12')
  return (
    <div>
       <ToastContainer/>
       {token === "" ? <Login/>
       :
       <>
       <Routes>
        <Route path="/" element={<AdminDashboard/>}/>
        <Route path="/validate" element={<Validate/>}/>
       </Routes>
       </>
       }
  
    </div>
  )
}

export default App
