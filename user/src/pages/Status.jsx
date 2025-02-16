import React from "react";
import  { useEffect } from "react";
import { CheckCircle, XCircle, Clock, CreditCard } from "lucide-react";
import axios from "axios";
import { backendUrl,razorpayUrl } from "../App";
import Navbar from "../components/Navbar";
import { useState } from "react";
const Status = ({setToken}) => {

 const [status,setStatus]=useState("")
  var paymentAmount = "1000";
  const [rejectionReason,setRejectionReason]=useState("")

  const token = localStorage.getItem("token");
  let userId = "";

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userId = payload.userId;
  }

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await axios.get(`${backendUrl}/status`, { 
          params: { userId }  
        });
       
         setStatus(response.data.status)
         setRejectionReason(response.data.reason)
       
      } catch (error) {
        console.error("Error accepting application:", error);
      }  
    };
  
    getStatus();
  }, [userId]);
  



  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        alert("Failed to load Razorpay SDK. Please check your internet connection.");
        return;
      }

      const response = await axios.post(`${backendUrl}/create-order`, {
        amount: paymentAmount,
       userId: userId,
      });

      const { order } = response.data;

      if (!order) {
        throw new Error("Failed to create order");
      }

      const options = {
        key: razorpayUrl,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Your Company Name",
        description: "Purchase Description",
        handler: async function (response) {
          response.userId=userId
          try {
            const verifyResponse = await axios.post(`${backendUrl}/verify-payment`, response);
            
            if (verifyResponse.data.success) {
              alert("Payment successful!");
              window.location.reload();
            } else {
              alert("Payment verification failed!");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Error verifying payment");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error processing payment");
    }
  };

  return (
    <div>
      <Navbar setToken={setToken}/>
      <div className="flex items-center my-4 space-x-4 p-4 border rounded-lg shadow-md bg-white">
      {status === "pending" && (
        <div className="flex items-center space-x-2 text-yellow-500">
          <Clock className="w-6 h-6" />
          <span>Pending</span>
        </div>
      )}
      {status === "accepted" && (
        <div className="flex items-center space-x-2 text-blue-500">
          <CreditCard className="w-6 h-6" />
          <span>Accepted</span>
          <span className="text-gray-700">₹{paymentAmount}</span>
          <button 
            onClick={handlePayment} 
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
            Pay Now
          </button>
        </div>
      )}
      {status === "rejected" && (
        <div className="flex items-center space-x-2 text-red-500">
          <XCircle className="w-6 h-6" />
          <span>Rejected</span>
          {rejectionReason && <p className="text-sm text-gray-600">Reason: {rejectionReason}</p>}
        </div>
      )}
      {status === "approved" && (
        <div className="flex items-center space-x-2 text-green-500">
          <CheckCircle className="w-6 h-6" />
          <span>Approved</span>
        </div>
      )}
    </div>
    </div>
  );
};

export default Status;
